const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');

router.post('/', logsController.ingestLog);

module.exports = router;
