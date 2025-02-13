const express = require('express'); // Import express for routing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating JWT tokens
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing and comparison
const axios = require('axios'); // Import axios for making HTTP requests to external services
const { Pool } = require('pg'); // Import Pool from pg for PostgreSQL connection pooling
require('dotenv').config(); // Load environment variables from .env file

console.log("DATABASE_URL:", process.env.DATABASE_URL); // Log the database URL to the console (for debugging)

const router = express.Router(); // Create a new express router
const pool = new Pool({ connectionString: process.env.DATABASE_URL }); // Create a new PostgreSQL pool using the database URL from environment variables

router.post('/', async (req, res) => { // Define a POST route for login
    const { email, password } = req.body; // Extract email and password from the request body
    console.log("Email received:", email); // Log received email for debugging
    console.log("Password received:", password); // Log received password for debugging

    // Validate that both email and password are provided in the request body
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' }); // Respond with a 400 if any field is missing
    }

    try {
        // Query the database to find the user by email
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0]; // Get the first result from the query

        // If the user is not found
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Respond with a 401 if the user does not exist
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Do passwords match?:", passwordMatch); // Log the result of the password comparison

        // If the passwords do not match
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Respond with a 401 if the passwords do not match
        }

        // Make a request to an external validation service to further verify the credentials (optional)
        //const validationResponse = await axios.post('http://localhost:3003/validation/authenticate', {
        const validationResponse = await axios.post('http://validate:3003/validation/authenticate', { // External service URL for validation
            email,
            password,
        });

        // If the external service returns an error or invalid credentials
        if (!validationResponse.data.valid) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Respond with a 401 if validation fails
        }

        // Generate a JWT token with the user's ID and role, set to expire in 1 hour
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Token generated:", token); // Log the generated token for debugging

        // Send a response containing the JWT and the user's role
        res.json({ token, role: user.role });
    } catch (error) {
        console.error("Login error:", error); // Log any errors for debugging
        res.status(500).json({ message: 'Server error' }); // Respond with a 500 status if an error occurs
    }
});

module.exports = router; // Export the router to be used in the main application
