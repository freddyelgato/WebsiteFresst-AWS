const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routesLogout/routes');
const app = express();
const PORT = 3003;

app.use(cors());
app.use(bodyParser.json());
app.use('/logout', routes);

app.listen(PORT, () => {
    console.log(`Logout service running on port ${PORT}`);
});