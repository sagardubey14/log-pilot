const express = require('express');
const app = express();
const logsRoutes = require('./routes/logsRoutes');

app.use(express.json());
app.use('/logs', logsRoutes);

module.exports = app;
