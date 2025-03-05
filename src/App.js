import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

const GITHUB_TOKEN = "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";  // Replace with your GitHub PAT
const ORG_NAME = "Employee";  // Replace with your GitHub org name

const SecurityDashboard = () => {
  const [securityData, setSecurityData] = useState([]);

  useEffect(() => {
    const fetchSecurityAlerts = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/orgs/${ORG_NAME}/security-advisories`,
          {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
          }
        );

        const formattedData = response.data.map(alert => ({
          id: alert.id,
          severity: alert.severity,
          type: alert.type,
        }));

        setSecurityData(formattedData);
      } catch (error) {
        console.error("Error fetching security alerts:", error);
      }
    };

    fetchSecurityAlerts();
  }, []);

  const severityCount = securityData.reduce((acc, alert) => {
    acc[alert.severity] = (acc[alert.severity] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(severityCount).map((key) => ({
    severity: key,
    count: severityCount[key],
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">GitHub Security Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Security Issues by Severity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="severity" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f56565" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Security Issues Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="count" nameKey="severity" cx="50%" cy="50%" outerRadius={80} fill="#3182ce" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
