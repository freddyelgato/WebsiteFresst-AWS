const blacklist = new Set();

module.exports = {
    add: (token) => blacklist.add(token),
    isBlacklisted: (token) => blacklist.has(token),
};
