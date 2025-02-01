const express = require('express');
const cors = require('cors');
const routes = require('./routesLogout/routes');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // URL del frontend
    credentials: true
}));

app.use(express.json());

app.use('/logout', routes);

const PORT = process.env.PORT_LOGOUT || 3002;
app.listen(PORT, () => {
    console.log(`Logout Service running on port ${PORT}`);
});
