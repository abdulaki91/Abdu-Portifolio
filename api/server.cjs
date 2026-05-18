/**
 * server.cjs - Entry point for cPanel/Passenger
 * This file bridges the ESM index.js with CommonJS requirements of some hosting environments.
 */

// Use dynamic import to load the ES module index.js
async function startServer() {
  try {
    console.log("Starting API server via server.cjs...");
    await import("./index.js");
  } catch (error) {
    console.error("Critical error during server startup:");
    console.error(error);
    process.exit(1);
  }
}

startServer();
