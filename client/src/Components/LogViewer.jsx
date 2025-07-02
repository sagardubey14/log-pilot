import React, { useState, useEffect } from "react";
import axios from "axios";
import LogCard from "./LogCard";
import LogsLevelChart from "./LogsLevelChart";

const levelOptions = ["error", "warn", "info", "debug"];

export default function LogViewer() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState({
    message: "",
    level: "",
    resourceId: "",
    timestamp_start: "",
    timestamp_end: "",
  });

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = {};
      for (const key in filters) {
        if (filters[key]) params[key] = filters[key];
      }
      const url =
        window.innerWidth < 1024
          ? "http://192.168.149.134:3001/logs"
          : "http://localhost:3001/logs";
      const res = await axios.get(url, { params });
      setLogs(res.data);
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      message: "",
      level: "",
      resourceId: "",
      timestamp_start: "",
      timestamp_end: "",
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-black text-green-400 font-mono">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-400 drop-shadow-[0_0_10px_rgba(57,255,20,0.7)]">
        <span
          className="text-2xl sm:text-3xl bx bx-radar icon-pulse mr-2"
          aria-hidden="true"
        />{" "}
        Log Pilot
      </h1>

        <div className="flex justify-end md:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 bg-green-900 text-green-300 px-3 py-2 rounded shadow-sm hover:bg-green-700 transition"
          >
            <span className="text-lg bx bx-filter " aria-hidden="true" />
            <span>Filter</span>
          </button>
        </div>

      <div
        className={`
          grid grid-cols-1 md:grid-cols-3 gap-4 bg-black border border-green-700 p-4 rounded shadow mb-2
          ${showMobileFilters ? "block" : "hidden"}
          ${showMobileFilters ? "fixed left-15": 'relative'}
          z-10
          md:grid
        `}
      >
        <div className="md:hidden col-span-full flex justify-end mb-2">
          <button
            onClick={() => setShowMobileFilters(false)}
            className="text-green-300 hover:text-green-500 transition"
          >
            ✕ Close
          </button>
        </div>

        <input
          name="message"
          placeholder="Search message"
          value={filters.message}
          onChange={handleChange}
          className="bg-black border border-green-500 text-green-400 placeholder-green-600 px-3 py-2 text-sm sm:text-base rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-80"
        />
        <select
          name="level"
          value={filters.level}
          onChange={handleChange}
          className="bg-black border border-green-500 text-green-400 px-3 py-2 text-sm sm:text-base rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-80"
        >
          <option value="" className="bg-black text-green-400">
            All Levels
          </option>
          {levelOptions.map((lvl) => (
            <option key={lvl} value={lvl} className="bg-black text-green-400">
              {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </option>
          ))}
        </select>
        <input
          name="resourceId"
          placeholder="Filter by resourceId"
          value={filters.resourceId}
          onChange={handleChange}
          className="bg-black border border-green-500 text-green-400 placeholder-green-600 px-3 py-2 text-sm sm:text-base rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-80"
        />
        <input
          type="datetime-local"
          name="timestamp_start"
          value={filters.timestamp_start}
          onChange={handleChange}
          className="bg-black border border-green-500 text-green-400 px-3 py-2 text-sm sm:text-base rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-80"
        />
        <input
          type="datetime-local"
          name="timestamp_end"
          value={filters.timestamp_end}
          onChange={handleChange}
          className="bg-black border border-green-500 text-green-400 px-3 py-2 text-sm sm:text-base rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-80"
        />
        <button
          onClick={clearFilters}
          className="bg-green-900 hover:bg-green-700 text-green-300 px-4 py-2 text-sm sm:text-base rounded shadow-sm transition"
        >
          Clear Filters
        </button>
      </div>
        
      <LogsLevelChart logs={logs} />
      {loading ? (
        <div className="text-center text-green-400 py-10">
          <div className="animate-spin h-6 w-6 mx-auto mb-2 border-4 border-green-400 border-t-transparent rounded-full"></div>
          <p>Loading logs...</p>
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center text-green-600 py-10 italic">
          No logs found for the current filter.
        </div>
      ) : (
        <div className="space-y-4 overflow-auto max-h-[500px] lg:max-h-[550px]">
          {logs.map((log, index) => (
            <LogCard key={index} log={log} />
          ))}
        </div>
      )}
    </div>
  );
}
