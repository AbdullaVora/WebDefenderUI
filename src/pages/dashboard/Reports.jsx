import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const Reports = () => {
  const fakeReports = [
    { tool: "Nmap", status: "Passed", timestamp: "2025-03-09T18:00:00Z" },
    { tool: "Nikto", status: "Failed", timestamp: "2025-03-09T19:15:00Z" },
    { tool: "SQLmap", status: "Passed", timestamp: "2025-03-09T19:45:00Z" },
    { tool: "Metasploit", status: "Failed", timestamp: "2025-03-09T20:30:00Z" },
    { tool: "Burp Suite", status: "Passed", timestamp: "2025-03-09T22:00:00Z" },
  ];

  const [reports, setReports] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setReports(fakeReports);
    }, 1000);
  }, []);

  const totalScans = reports.length;
  const passed = reports.filter((r) => r.status === "Passed").length;
  const failed = reports.filter((r) => r.status === "Failed").length;

  const pieData = [
    { name: "Passed", value: passed, color: "#06b6d4" }, // Cyan
    { name: "Failed", value: failed, color: "#ef4444" }, // Red
  ];

  const lineData = reports.map((report, index) => ({
    name: report.tool,
    Passed: report.status === "Passed" ? 1 : 0,
    Failed: report.status === "Failed" ? 1 : 0,
  }));

  return (
    <div className="min-h-screen bg-[#0E1427] text-white p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#040C1F] p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-cyan-400">Total Scans</h3>
          <p className="text-3xl font-bold">{totalScans}</p>
        </div>
        <div className="bg-[#040C1F] p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-green-400">Passed</h3>
          <p className="text-3xl font-bold">{passed}</p>
        </div>
        <div className="bg-[#040C1F] p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-red-400">Failed</h3>
          <p className="text-3xl font-bold">{failed}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#040C1F] p-6 rounded-xl shadow-md flex justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#040C1F] p-6 rounded-xl shadow-md">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Passed" stroke="#06b6d4" strokeWidth={3} />
              <Line type="monotone" dataKey="Failed" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Table */}
      <div className="mt-8 bg-[#040C1F] p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">Scan Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="border border-gray-600 px-4 py-2 text-left">Tool</th>
                <th className="border border-gray-600 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-600 px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index} className="hover:bg-gray-600">
                  <td className="border border-gray-600 px-4 py-2">{report.tool}</td>
                  <td className={`border border-gray-600 px-4 py-2 font-semibold ${report.status === "Failed" ? "text-red-500" : "text-green-500"}`}>
                    {report.status}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {new Date(report.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;