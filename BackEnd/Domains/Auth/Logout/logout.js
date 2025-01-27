const logoutHandler = (req, res) => {
    res.json({ message: 'Sesión cerrada exitosamente' });
};

module.exports = { logoutHandler };