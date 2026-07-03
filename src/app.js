const express = require('express');

const app = express();



app.use('/api/v1', require('./router'));

module.exports = app;
