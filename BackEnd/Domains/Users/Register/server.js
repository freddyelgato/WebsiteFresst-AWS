const express = require('express');
const cors = require('cors');
const routes = require('./registerRoutes/routes');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // URL del frontend
    credentials: true
}));
app.use(express.json());

app.use('/register', routes);

const PORT = process.env.PORT_REGISTER || 3004;
app.listen(PORT, () => {
    console.log(`Register Service running on port ${PORT}`);
});