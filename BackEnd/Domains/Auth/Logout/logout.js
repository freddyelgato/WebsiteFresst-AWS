const express = require('express'); // Import express to create routing and handle HTTP requests
const axios = require('axios'); // Import axios for making HTTP requests to another service
const router = express.Router(); // Create a new router instance to handle the routes

// Route for logout
router.post('/', async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get the token from the header
    console.log("Token received in Logout:", token);

    if (!token) {
        return res.status(400).json({ message: 'Token required' }); // If no token is provided, return an error
    }

    try {
        // Notify the Validation service to revoke the token
        const response = await axios.post('http://validate:3003/validation/revoke', { token });
        //const response = await axios.post('http://localhost:3003/validation/revoke', { token });

        if (response.status === 200) {
            return res.json({ message: 'Logout successful' }); // If the revocation is successful, return a success message
        } else {
            return res.status(500).json({ message: 'Error revoking the token' }); // If there's an error revoking the token, return an error message
        }
    } catch (error) {
        console.error('Error during logout:', error.response?.data || error.message); // Log the error in case of failure
        return res.status(500).json({ message: 'Error during logout' }); // Return a generic error message if something fails
    }
});

module.exports = router; // Export the router to be used in other parts of the application
