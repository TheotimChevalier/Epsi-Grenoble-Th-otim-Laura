import { createPool, Pool } from 'mysql2/promise';

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'appdb',
} = process.env;

let pool: Pool;

export async function getPool(): Promise<Pool> {
  if (!pool) {
    pool = createPool({
      host: DB_HOST,
      port: parseInt(DB_PORT, 10),
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      connectionLimit: 5,
    });
    // simple connectivity check with retries
    let attempts = 0;
    while (attempts < 30) {
      try {
        const conn = await pool.getConnection();
        conn.release();
        break;
      } catch (e) {
        attempts++;
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }
  return pool;
}
