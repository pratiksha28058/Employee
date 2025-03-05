import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import React, { useEffect, useState } from 'react';


  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/pratiksha28058/Employee/dependabot/alerts', {
          headers: {
            Authorization: `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`,
            Accept: 'application/vnd.github+json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setAlerts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Security Overview</h1>
      {alerts.length === 0 ? (
        <p>No security alerts found.</p>
      ) : (
        <ul>
          {alerts.map(alert => (
            <li key={alert.id}>
              <strong>{alert.security_advisory.summary}</strong> - {alert.state}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SecurityOverview;
