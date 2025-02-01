const express = require('express');
const routes = require('./routesValidation/routes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/validation', routes);

const PORT = process.env.PORT_VALIDATION || 3003;
app.listen(PORT, () => {
    console.log(`Validation Service running on port ${PORT}`);
});
