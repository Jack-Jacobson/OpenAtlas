const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const {initializeDatabase, getDbConnection} = require('./config/database');
const {initializeUsersDatabase, getUsersDbConnection} = require('./config/usersDatabase');
const authRoutes = require ('./authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

const {requireAuth} = require('./auth');
app.get('/api/me', requireAuth, (req,res) => {
    res.json({
        success: true,
        userId: req.userId,
        username: req.username
    });
});

app.delete('/api/auth/delete-account', requireAuth, (req,res) => {
    const mainDb = getDbConnection();
    const usersDb = getUsersDbConnection();

    mainDb.run('DELETE FROM resources WHERE user_id = ?', [req.userId], function(err) {
        if(err) {
            console.error('Delete resources error:', err.message);
            return res.status(500).json({success: false, message: "Failed to delete saved resources."});
        }

        usersDb.run('DELETE FROM user_preferences WHERE user_id = ?', [req.userId], function(err) {
            if(err) {
                console.error('Delete preferences error:', err.message);
                return res.status(500).json({ success: false, message: 'Failed to delete preferences.'});
            }

            usersDb.run('DELETE FROM users WHERE id = ?', [req.userId], function(err) {
                if(err) {
                    console.error('Delete user error:', err.message);
                    return res.status(500).json({success: false, message: 'Failed to delete account'});
                }
            
                res.clearCookie('token', {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV === 'production'
                });

                return res.json({success: true, message: 'Account and all data deleted.'});
            });
        });
    });
});

app.post('/api/resources', requireAuth, (req,res) => {
    const {url, title, notes} = req.body;
    const db = getDbConnection();
    const resourceId = crypto.randomUUID();

    const sqlQuery = `
        INSERT INTO resources (id, user_id, url, title, notes, content_snippet, project_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const queryParameters = [resourceId, req.userId, url, title, notes || null, null, null];

    db.run(sqlQuery, queryParameters, function(err) {
        if (err) {
            console.error(`SQL execution error: ${err.message}`);
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }

        console.log(`Saved to SQL: "${title}" (ID: ${resourceId})`);

        res.status(200).json({
            success: true,
            message: "Recorded inside your Knowledge Atlas.",
            id: resourceId
        });
    });
});

app.get('/api/resources', requireAuth, (req, res) => {
    const db = getDbConnection();
    const sqlQuery = `
        SELECT id, url, title, notes, created_at
        FROM resources
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.all(sqlQuery, [req.userId], (err, rows) => {
        if(err) {
            console.error(`SQL data retrieval error: ${err.message}`);
            return res.status(500).json({
                success: false,
                error: 'Error getting data'
            });
        }

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found.`
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

async function startServer(){
    try {
        await initializeDatabase();
        await initializeUsersDatabase();

        app.listen(PORT, () => {
            console.log(`OpenAtlas server is actively listening on http://localhost:5000`);
        });
    } catch (error) {
        console.error(`Server failed to start due to storage: ${error.message}`);
        process.exit(1);
    }
}

startServer();