const logService = require('../services/logService');

exports.ingestLog = async (req, res) => {
  const log = req.body;
  try {
    const savedLog = await logService.saveLog(log);
    res.status(201).json(savedLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save log' });
  }
};
