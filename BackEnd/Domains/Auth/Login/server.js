const express = require('express');
const cors = require('cors');
const loginRoutes = require('./routesLogin/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/login', loginRoutes);

app.listen(3001, () => console.log('Login Service running on port 3001'));
