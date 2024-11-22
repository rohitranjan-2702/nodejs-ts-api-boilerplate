import { drizzle } from "drizzle-orm/node-postgres";
import fs from "fs";
import pg from "pg";
import { env } from "../env.js";
import * as schema from "./schema.js";

const config = {
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  database: env.POSTGRES_DATABASE,
  ssl: {
    rejectUnauthorized: true, // set true for production
    ca: fs.readFileSync(process.cwd() + "/src/ca.pem").toString(),
  },
};

export const pgClient = new pg.Client(config);

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: typeof pgClient | undefined;
};

async function connect() {
  try {
    await pgClient.connect();
    console.log("Connected to PostgreSQL");
  } catch (err) {
    console.error("Connection error:", err);
  }
}

connect();

const conn = globalForDb.conn ?? pgClient;
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
