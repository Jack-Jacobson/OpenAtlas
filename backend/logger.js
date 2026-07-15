const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'activity.log');

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

function logEvent(type, details) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${type}] ${details}\n`;
    fs.appendFile(LOG_FILE, line, (err) => {
        if (err) console.error('Failed to write activity log:', err.message);
    });
}

module.exports = { logEvent, LOG_FILE };