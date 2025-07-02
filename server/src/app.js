const express = require('express');
const app = express();
const cors = require('cors');
const logsRoutes = require('./routes/logsRoutes');

app.use(cors());
app.use(express.json());
app.use('/logs', logsRoutes);

module.exports = app;
