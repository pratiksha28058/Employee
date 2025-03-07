<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
=======
import React, { useEffect, useState } from 'react';

const SecurityOverview = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
>>>>>>> ca889aac8a79757a4bad31e1ba5cb8437a9da8c3
