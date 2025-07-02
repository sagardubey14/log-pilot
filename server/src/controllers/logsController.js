const logService = require('../services/logService');
const validateLog = require('../utils/validateLog');


exports.ingestLog = async (req, res) => {
  const log = req.body;
  const { valid, errors } = validateLog(log);

  if (!valid) {
    return res.status(400).json({ error: 'Invalid log format', details: errors });
  }

  try {
    const savedLog = await logService.saveLog(log);
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save log' });
  }

};

exports.getLogs = async (req, res) => {
  try {
    const logs = await logService.filterLogs(req.query);
    res.status(200).json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve logs' });
  }
};
