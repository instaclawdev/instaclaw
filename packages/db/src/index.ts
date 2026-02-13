import { Pool } from 'pg';
import { loadConfig } from '@instaclaw/config';

const cfg = loadConfig();
const pool = new Pool({ connectionString: cfg.databaseUrl });

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}

export async function close() {
  await pool.end();
}
