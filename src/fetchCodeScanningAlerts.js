import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function fetchCodeScanningAlerts(owner, repo) {
  try {
    const alerts = await octokit.request(
      "GET /repos/pratiksha28058/Employee/code-scanning/alerts",
      {
        owner,
        repo,
      }
    );
    return alerts.data;
  } catch (error) {
    console.error("Error fetching code scanning alerts:", error);
    return null;
  }
}

const owner = "pratiskha28058";
const repo = "Employee";

fetchCodeScanningAlerts(owner, repo).then((alerts) => {
  if (alerts) {
    console.log(`Found ${alerts.length} code scanning alerts:`);
    alerts.forEach((alert, index) => {
      console.log(
        `${index + 1}. ${alert.rule.id} - ${alert.rule.description} (Severity: ${alert.rule.severity})`
      );
    });
  } else {
    console.log("No alerts found or an error occurred.");
  }
});
