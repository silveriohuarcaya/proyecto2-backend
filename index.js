require('dotenv').config();
const express = require('express');

const connectDB = require('./config/database');
const configExpress = require('./config/express');
const configRoutes = require('./routes');

const app = express();

configExpress(app);
connectDB();
configRoutes(app);

PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
