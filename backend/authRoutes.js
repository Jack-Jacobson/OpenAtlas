const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { getUsersDbConnection } = require('./config/usersDatabase');
const { JWT_SECRET } = require('./auth');

const router = express.Router();
const SALT_ROUNDS = 12;

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
};

function validateUsername(username) {
  return (
    typeof username === 'string' &&
    username.length >= 3 &&
    username.length <= 32 &&
    /^[a-zA-Z0-9_-]+$/.test(username)
  );
}

function validatePassword(password) {
  return typeof password === 'string' && password.length >= 8;
}

function sanitizeUser(row) {
  return {
    id: row.id,
    username: row.username,
    email: row.email || null,
    created_at: row.created_at
  };
}

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!validateUsername(username)) {
      return res.status(400).json({
        success: false,
        message: 'Username must be 3-32 characters (letters, numbers, _, -).'
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters.'
      });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address.'
      });
    }

    const db = getUsersDbConnection();

    db.get('SELECT id FROM users WHERE username = ?', [username], async (err, row) => {
      if (err) {
        console.error('Register check error:', err.message);
        return res.status(500).json({
          success: false,
          message: 'Server error during registration.'
        });
      }

      if (row) {
        return res.status(409).json({
          success: false,
          message: 'Username already taken.'
        });
      }

      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      const userId = crypto.randomUUID();

      const insertUser = db.prepare(
        'INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)'
      );

      insertUser.run(userId, username, email || null, hash, function (insertErr) {
        if (insertErr) {
          console.error('User insert error:', insertErr.message);
          return res.status(500).json({
            success: false,
            message: 'Server error during registration.'
          });
        }

        const insertPrefs = db.prepare(
          'INSERT INTO user_preferences (id, user_id) VALUES (?, ?)'
        );

        insertPrefs.run(crypto.randomUUID(), userId, function (prefsErr) {
          if (prefsErr) {
            console.error('Preferences insert error:', prefsErr.message);
            return res.status(500).json({
              success: false,
              message: 'Server error during registration.'
            });
          }

          db.get(
            'SELECT id, username, email, created_at FROM users WHERE id = ?',
            [userId],
            (selectErr, user) => {
              if (selectErr || !user) {
                return res.status(500).json({
                  success: false,
                  message: 'Server error during registration.'
                });
              }

              const token = jwt.sign(
                { userId: user.id, username: user.username },
                JWT_SECRET,
                { expiresIn: '7d' }
              );

              res.cookie('token', token, COOKIE_OPTS);
              return res.status(201).json({
                success: true,
                user: sanitizeUser(user),
                token
              });
            }
          );
        });
      });
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration.'
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password required.'
      });
    }

    const db = getUsersDbConnection();

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
      if (err) {
        console.error('Login error:', err.message);
        return res.status(500).json({
          success: false,
          message: 'Server error during login.'
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials.'
        });
      }

      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials.'
        });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.cookie('token', token, COOKIE_OPTS);
      return res.json({
        success: true,
        user: sanitizeUser(user),
        token
      });
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error during login.'
    });
  }
});

router.get('/status', (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.json({
      success: true,
      authenticated: false
    });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const db = getUsersDbConnection();

    db.get(
      'SELECT id, username, email, created_at FROM users WHERE id = ?',
      [payload.userId],
      (err, user) => {
        if (err || !user) {
          return res.json({
            success: true,
            authenticated: false
          });
        }

        return res.json({
          success: true,
          authenticated: true,
          user
        });
      }
    );
  } catch (err) {
    return res.json({
      success: true,
      authenticated: false
    });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });

  return res.json({
    success: true,
    message: 'Session terminated!'
  });
});

module.exports = router;