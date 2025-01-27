const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routesValidation/routes');
const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());
app.use('/validate', routes);

app.listen(PORT, () => {
    console.log(`Validation service running on port ${PORT}`);
});
