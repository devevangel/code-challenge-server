import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "db.json");

// Configure LowDB to write to JSON file
const adapter = new JSONFile(filePath);
export const db = new Low(adapter, { products: [] });

// Initialize database with default structure if empty
await db.read();
db.data = db.data || { products: [] };
await db.write();

export default db;
