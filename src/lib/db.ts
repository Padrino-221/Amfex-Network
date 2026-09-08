import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:1234567890@localhost:5432/emmanuel_portfolio?schema=public";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

export const db =
  globalThis.__pgPool ??
  new Pool({
    connectionString,
    ssl: false,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__pgPool = db;
}

export async function query<T = unknown>(text: string, params?: unknown[]): Promise<T[]> {
  const res = await db.query(text, params);
  return res.rows as T[];
}
