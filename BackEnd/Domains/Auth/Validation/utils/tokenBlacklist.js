// Create a Set to store blacklisted tokens
const blacklist = new Set();

module.exports = {
    // Function to add a token to the blacklist
    add: (token) => blacklist.add(token),
    
    // Function to check if a token is blacklisted
    isBlacklisted: (token) => blacklist.has(token),
};
