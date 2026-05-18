import pkg from "pg";
import dotenv from "dotenv";
import { createTunnel } from "tunnel-ssh";

dotenv.config();

const { Pool } = pkg;

let pool;
let tunnel;

// Initialize connection with SSH tunnel
const initializeConnection = async () => {
  try {
    // Check if SSH tunnel is needed
    if (process.env.USE_SSH_TUNNEL === "true") {
      console.log("Setting up SSH tunnel...");

      const tunnelOptions = {
        autoClose: false,
      };

      const serverOptions = {
        port: parseInt(process.env.LOCAL_DB_PORT) || 5432,
      };

      const sshOptions = {
        host: process.env.SSH_HOST,
        port: parseInt(process.env.SSH_PORT) || 22,
        username: process.env.SSH_USER,
      };

      // Add authentication method (key or password)
      if (process.env.SSH_KEY_PATH) {
        // Use SSH key authentication
        const fs = await import("fs");
        sshOptions.privateKey = fs.readFileSync(process.env.SSH_KEY_PATH);
        if (process.env.SSH_PASSPHRASE) {
          sshOptions.passphrase = process.env.SSH_PASSPHRASE;
        }
      } else if (process.env.SSH_PASSWORD) {
        // Use password authentication
        sshOptions.password = process.env.SSH_PASSWORD;
      } else {
        throw new Error("Either SSH_KEY_PATH or SSH_PASSWORD must be provided");
      }

      const forwardOptions = {
        srcAddr: "127.0.0.1",
        srcPort: parseInt(process.env.LOCAL_DB_PORT) || 5432,
        dstAddr: "localhost", // Remote PostgreSQL is on the same server
        dstPort: parseInt(process.env.REMOTE_DB_PORT) || 5432,
      };

      // Create SSH tunnel
      const [server, conn] = await createTunnel(
        tunnelOptions,
        serverOptions,
        sshOptions,
        forwardOptions,
      );

      tunnel = { server, conn };
      console.log(`SSH tunnel established on local port ${serverOptions.port}`);

      // Connect through tunnel (localhost)
      pool = new Pool({
        host: "127.0.0.1",
        port: parseInt(process.env.LOCAL_DB_PORT) || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        ssl: false, // No SSL needed through tunnel
      });
    } else {
      // Direct connection
      console.log("Connecting directly to PostgreSQL...");
      pool = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 5432,
        ssl:
          process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
      });
    }

    // Test the connection
    const res = await pool.query("SELECT NOW()");
    console.log("Connected to PostgreSQL at:", res.rows[0].now);
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    throw error;
  }
};

// Graceful shutdown
const closeConnection = async () => {
  try {
    if (pool) {
      await pool.end();
      console.log("PostgreSQL connection closed");
    }
    if (tunnel) {
      tunnel.server.close();
      tunnel.conn.end();
      console.log("SSH tunnel closed");
    }
  } catch (error) {
    console.error("Error closing connections:", error);
  }
};

// Handle process termination
process.on("SIGINT", async () => {
  await closeConnection();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeConnection();
  process.exit(0);
});

// Initialize on module load
await initializeConnection();

export default pool;
