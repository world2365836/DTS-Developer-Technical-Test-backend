import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();


const pool = new Pool({
  user: process.env.DB_USER || "", // e.g. "postgres"
  host: process.env.DB_HOST || "", // e.g. "localhost"
  database: process.env.DB_NAME || "", // e.g. "task"
  password: process.env.DB_PASSWORD || "", // e.g. "yourpassword"
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined, // e.g. 5432
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 3000
});


export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}
export default pool;
