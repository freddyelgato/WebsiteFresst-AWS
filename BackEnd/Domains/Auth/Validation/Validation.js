const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

// Adjusting the path for the token blacklist
// const tokenBlacklist = require('./Backend/Auth/Logout/utils/tokenBlacklist');
const tokenBlacklist = require('./utils/tokenBlacklist');

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Route to authenticate credentials
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Query the user by email from the database
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.json({ valid: false });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({ valid: false });
        }

        res.json({ valid: true, user });
    } catch (error) {
        console.error('Error authenticating user:', error.message);
        res.status(500).json({ message: 'Error authenticating user' });
    }
});

// Route to validate a token
router.post('/', async (req, res) => {
    const { token } = req.body;

    if (!token || tokenBlacklist.isBlacklisted(token)) {
        return res.json({ valid: false });
    }

    // Verify the token using JWT
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.json({ valid: false });

        try {
            // Query the user by ID from the database
            const userResponse = await pool.query('SELECT * FROM users WHERE id = $1', [user.id]);

            if (userResponse.rows[0]) {
                return res.json({ valid: true });
            } else {
                return res.json({ valid: false });
            }
        } catch (error) {
            console.error('Error verifying user:', error.message);
            return res.json({ valid: false });
        }
    });
});

// Route to revoke tokens
router.post('/revoke', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    // Add the token to the blacklist
    tokenBlacklist.add(token);
    res.json({ message: 'Token revoked' });
});

module.exports = router;
