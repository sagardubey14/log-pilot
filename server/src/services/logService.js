const fsp = require("fs/promises");
const path = require('path');

const LOG_FILE = path.join(__dirname, '../../data/logs.json');

const readLogs = async () => {
  try {
    const data = await fsp.readFile(LOG_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveLog = async (log) => {
  const logs = await readLogs();
  logs.push(log);
  await fsp.writeFile(LOG_FILE, JSON.stringify(logs, null, 2));
  return log;
};

module.exports = {
  saveLog,
  readLogs,
};
