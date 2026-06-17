const sqlite3 = require('sqlite3').verbose();
const path = require ('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', 'db', 'users.db');
const SCHEMA_PATH = path.join(__dirname, '..', 'db', 'users_schema.sql');

let db = null;

function initializeUsersDatabase(){
    return new Promise((resolve,reject) => {
        db = new sqlite3.Database(DB_PATH, (err) => {
            if(err) {
                console.error(`Users database connection failed: ${err.message}`);
                return reject(err);
            }

            console.log('Connected to users database');

            fs.readFile(SCHEMA_PATH, 'utf-8', (readErr, schemaContent) => {
                if(readErr){
                    console.error(`Unable to read users schema: ${readErr.message}`);
                    return reject(readErr);
                }

                db.exec(schemaContent, (execErr) => {
                    if(execErr){
                        console.error(`Unable to construct users database schema table: ${execErr}`);
                        return reject(execErr);
                    }
                    console.log('Users database initialized.');
                    resolve(db);
                });
            });
        });
    });
}

function getUsersDbConnection() {
    if(!db){
        throw new Error('Users database connection not initialized. Call initializeUsersDatabase first.')
    }
    return db;
}

module.exports = {
    initializeUsersDatabase,
    getUsersDbConnection
};