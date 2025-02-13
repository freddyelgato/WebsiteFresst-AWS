// Importing the jwt library and dotenv for environment variables
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import the tokenBlacklist utility to check for blacklisted tokens
const tokenBlacklist = require('../utils/tokenBlacklist');

module.exports = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1];

    // If there is no token or the token is blacklisted, return a 403 Forbidden error
    if (!token || tokenBlacklist.isBlacklisted(token)) {
        return res.status(403).json({ message: 'Access denied' });
    }

    // Verify the token using the secret from environment variables
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // If the token is invalid, return a 403 Forbidden error
        if (err) return res.status(403).json({ message: 'Invalid token' });

        // Attach the user information from the token to the request object
        req.user = user;
        
        // Call the next middleware or route handler
        next();
    });
};
