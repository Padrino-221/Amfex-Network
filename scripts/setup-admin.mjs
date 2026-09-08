import pg from "pg";
import crypto from "crypto";

const { Pool } = pg;
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgresql://postgres:1234567890@localhost:5432/emmanuel_portfolio?schema=public",
});

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "User" (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const email = process.env.ADMIN_EMAIL || "admin@amfex.network";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const fullName = process.env.ADMIN_NAME || "Amfex Admin";

  const existing = await pool.query(`SELECT id FROM "User" WHERE email = $1`, [email]);
  if (existing.rows.length > 0) {
    console.log(`Admin already exists for ${email}`);
    await pool.end();
    return;
  }

  await pool.query(
    `INSERT INTO "User" (id, full_name, email, password_hash, role)
     VALUES (gen_random_uuid(), $1, $2, $3, 'admin')`,
    [fullName, email, hashPassword(password)]
  );
  console.log(`Created admin: ${email} (password set via ADMIN_PASSWORD or default)`);
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
