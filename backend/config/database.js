const sqlite3 = require('sqlite3').verbose();
const path = require ('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', 'db', 'openatlas.db');
const SCHEMA_PATH = path.join(__dirname, '..', 'db', 'schema.sql');

let db = null;

function initializeDatabase(){
    return new Promise((resolve,reject) => {
        db = new sqlite3.Database(DB_PATH, (err) => {
            if(err) {
                console.error(`Database connection failed: ${err.message}`);
                return reject(err);
            }

            console.log('Connected to database');

            fs.readFile(SCHEMA_PATH, 'utf-8', (readErr, schemaContent) => {
                if(readErr){
                    console.error(`Unable to read schema: ${readErr.message}`);
                    return reject(readErr);
                }

                db.exec(schemaContent, (execErr) => {
                    if(execErr){
                        console.error(`Unable to construct database schema table: ${execErr}`);
                        return reject(execErr);
                    }
                    console.log('Database initialized.');
                    resolve(db);
                });
            });
        });
    });
}

function getDbConnection() {
    if(!db){
        throw new Error('Datanase connection not initialized. Call initializeDatabse.')
    }
    return db;
}

module.exports = {
    initializeDatabase,
    getDbConnection
};