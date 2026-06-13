const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const {initializeDatabase, getDbConnection} = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/resources', (req,res) => {
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

app.get('/api/resources', (req, res) => {
    const db = getDbConnection();
    const sqlQuey = `
        SELECT id, url, title, notes, created_at
        FROM resources
        ORDER BY created_at DESC
    `;

    db.all(sqlQuey, [], (err, rows) => {
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

initializeDatabase()
    .then (() => {
        app.listen(5000, () => {
            console.log(`OpenAtlas server is actively listening on http://localhost:5000`);
        });
    })
    .catch((error) => {
        console.error(`Server failed to start due to storage: ${error.message}`);
        process.exit(1);
    });
