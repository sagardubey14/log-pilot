const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');

router.post('/', logsController.ingestLog);
router.get('/', logsController.getLogs);


module.exports = router;
