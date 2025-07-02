import React, { useState } from 'react';

export default function LogCard({ log }) {
  const [expanded, setExpanded] = useState(false);

  const levelConfig = {
    error: {
      iconClass: 'bx bx-error',
      color: 'bg-red-900 border-red-500 text-red-400 shadow-[0_0_10px_rgba(248,113,113,0.7)]',
    },
    warn: {
      iconClass: 'bx bx-error-alt',
      color: 'bg-yellow-900 border-yellow-500 text-yellow-400 shadow-[0_0_10px_rgba(253,224,71,0.7)]',
    },
    info: {
      iconClass: 'bx bx-info-circle',
      color: 'bg-blue-900 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.7)]',
    },
    debug: {
      iconClass: 'bx bx-bug',
      color: 'bg-gray-900 border-gray-700 text-gray-400 shadow-[0_0_10px_rgba(156,163,175,0.7)]',
    },
  };

  const { iconClass, color } = levelConfig[log.level] || {
    iconClass: 'bx bx-question-mark',
    color: 'bg-gray-900 border-gray-700 text-gray-400',
  };
  const formattedDate = new Date(log.timestamp).toLocaleString();

  return (
    <div
      className={`cursor-pointer border-l-4 p-4 rounded shadow-lg transition-all duration-300 ease-in-out ${color} bg-black bg-opacity-70`}
      onClick={() => setExpanded(!expanded)}
      title="Click to view full log details"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-green-400 drop-shadow-[0_0_6px_rgba(57,255,20,0.9)] text-sm md:text-base">
          <span className={`text-lg md:text-xl ${iconClass} icon-pulse`} aria-hidden="true" />
          <span className="capitalize">{log.level}</span>
        </div>
        <div className="text-xs md:text-sm text-green-500">{formattedDate}</div>
      </div>

      <div className="mt-2 font-mono font-medium text-green-300 truncate max-w-full overflow-x-auto text-sm md:text-base">
        {log.message}
      </div>

      <div
        className={`grid grid-cols-2 gap-2 text-green-400 overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? 'max-h-[1000px] mt-4' : 'max-h-0'
        } text-xs md:text-sm`}
      >
        <div><strong>Resource ID:</strong> {log.resourceId}</div>
        <div><strong>Trace ID:</strong> {log.traceId}</div>
        <div><strong>Span ID:</strong> {log.spanId}</div>
        <div><strong>Commit:</strong> {log.commit}</div>
        <div className="col-span-2">
          <strong>Metadata:</strong>
          <pre className="bg-black bg-opacity-60 rounded p-2 mt-1 font-mono overflow-auto max-h-48 whitespace-pre-wrap break-words text-[0.7rem] md:text-xs">
            {JSON.stringify(log.metadata, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
