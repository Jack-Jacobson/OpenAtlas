const jwt = require ('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
    throw new Error('JWT_SECRET environment variable required');
}

function requireAuth(req, res, next) {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Not authenticated."
        });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        req.username = payload.username;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired session'
        });
    }
}

module.exports = { requireAuth, JWT_SECRET };