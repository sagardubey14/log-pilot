const logService = require('../services/logService');
const socketService = require('../services/socketService');
const validateLog = require('../utils/validateLog');


exports.ingestLog = async (req, res) => {
  const log = req.body;
  const { valid, errors } = validateLog(log);

  if (!log || typeof log !== 'object') {
    return res.status(400).json({
      error: 'Bad Request',
    });
  }

  if (!valid) {
    return res.status(400).json({ error: 'Invalid log format', details: errors });
  }

  try {
    const savedLog = await logService.saveLog(log);
    const io = socketService.getIO();
    
    io.emit('new_log', savedLog);

    res.status(201).json(savedLog);
  } catch (err) {
    console.error('Error saving log:', err);
    return res.status(500).json({
      error: 'Internal Server Error: Failed to save log',
    });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await logService.filterLogs(req.query);
    res.status(200).json(logs);
  } catch (err) {
    console.error('Error retrieving logs:', err);
    return res.status(500).json({
      error: 'Internal Server Error: Failed to retrieve logs',
    });
  }
};
