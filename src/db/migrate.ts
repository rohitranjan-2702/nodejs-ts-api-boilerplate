import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pgClient } from "./index.js";

async function init() {
  // This will run migrations on the database, skipping the ones already applied
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrated !");
  } catch (ex) {
    console.error("Error in migration:", ex);
  } finally {
    console.log("Done");
  }

  // Don't forget to close the connection, otherwise the script will hang
  await pgClient.end();
}

init();
