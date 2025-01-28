// Lista negra en memoria (usar Redis o DB en producción)
const blacklist = new Set();

/**
 * Agrega un token a la lista negra
 */
const addToBlacklist = (token) => {
    blacklist.add(token);
};

/**
 * Verifica si un token está en la lista negra
 */
const isBlacklisted = (token) => {
    return blacklist.has(token);
};

module.exports = { addToBlacklist, isBlacklisted };
