const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const {initializeDatabase, getDbConnection} = require('./config/database');
const {initializeUsersDatabase} = require('./config/usersDatabase');
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

app.post('/api/resources', requireAuth, (req,res) => {
    const {url, title, notes} = req.body;
    const db = getDbConnection();
    const resourceId = crypto.randomUUID();

    const sqlQuery = `
        INSERT INTO resources (id, url, title, notes, content_snippet, project_id)
        VALUES (?, ?, ?, ?, ?, ?)

    `;

    const queryParameters = [resourceId, url, title, notes || null, null, null];

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
        ORDER BY created_at DESC
    `;

    db.all(sqlQuery, [], (err, rows) => {
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

async function startServer(){
    try {
        await initializeDatabase();
        await initializeUsersDatabase();

        app.listen(5000, () => {
            console.log(`OpenAtlas server is actively listening on http://localhost:5000`);
        });
    } catch (error) {
        console.error(`Server failed to start due to storage: ${error.message}`);
        process.exit(1);
    }
}

startServer();