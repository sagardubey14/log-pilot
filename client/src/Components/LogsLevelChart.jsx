import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function LogsLevelChart({ logs }) {
  const data = ['info', 'debug', 'warn', 'error'].map(level => ({
    level,
    count: logs.filter(log => log.level === level).length,
  }));

  return (
    <div className="bg-black p-4 rounded border border-green-700 shadow-sm mb-2">
      <h2 className="text-green-400 font-mono mb-2 text-center">Log Counts by Level</h2>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={data} margin={{ top: 10, right: 30, bottom: 0, left: 0 }}>
          <XAxis dataKey="level" stroke="#57ff6e" />
          <YAxis stroke="#57ff6e" allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#000', borderColor: '#57ff6e', color: '#57ff6e' }}
          />
          <Bar dataKey="count" fill="#39ff14" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
