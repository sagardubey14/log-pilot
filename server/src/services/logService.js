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

const filterLogs = async (query) => {
  let logs = await readLogs();

  logs = logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  if (query.level) logs = logs.filter(l => l.level === query.level);
  if (query.message) logs = logs.filter(l => l.message.toLowerCase().includes(query.message.toLowerCase()));
  if (query.resourceId) logs = logs.filter(l => l.resourceId === query.resourceId);
  if (query.timestamp_start) logs = logs.filter(l => new Date(l.timestamp) >= new Date(query.timestamp_start));
  if (query.timestamp_end) logs = logs.filter(l => new Date(l.timestamp) <= new Date(query.timestamp_end));
  ['traceId', 'spanId', 'commit'].forEach(key => {
    if (query[key]) logs = logs.filter(l => l[key] === query[key]);
  });

  return logs;
};

module.exports = {
  saveLog,
  readLogs,
  filterLogs,
};
