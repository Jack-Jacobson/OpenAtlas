PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS resources (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    notes TeXT,
    content_snippet TEXT,
    project_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);