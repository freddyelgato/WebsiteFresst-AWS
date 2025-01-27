const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routesLogin/routes');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/login', routes);

app.listen(PORT, () => {
    console.log(`Login service running on port ${PORT}`);
});
