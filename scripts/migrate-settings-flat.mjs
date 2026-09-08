import pg from 'pg';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://postgres:1234567890@localhost:5432/emmanuel_portfolio?schema=public' });

async function ensureColumn() {
  // Convert value from JSON/JSONB to TEXT if needed (idempotent)
  const col = await pool.query(`SELECT data_type, udt_name FROM information_schema.columns WHERE table_name='SiteSettings' AND column_name='value'`);
  console.log('Current value column type:', col.rows[0]);
  if (col.rows[0]?.data_type === 'json' || col.rows[0]?.data_type === 'jsonb') {
    await pool.query(`ALTER TABLE "SiteSettings" ALTER COLUMN "value" TYPE TEXT USING "value"::text`);
    console.log('Altered value column to TEXT');
  }
}

async function flatten() {
  const rows = await pool.query(`SELECT key, value FROM "SiteSettings"`);
  const map = {};
  for (const r of rows.rows) {
    let v = r.value;
    // pg may return already parsed object if jsonb, or string if text after alter
    if (typeof v === 'string') {
      try { v = JSON.parse(v); } catch { /* keep string */ }
    }
    map[r.key] = v;
  }
  console.log('Existing keys:', Object.keys(map));

  const inserts = [];

  // hero: {name, tagline, subtagline, photo} -> hero_*
  if (map.hero && typeof map.hero === 'object') {
    inserts.push(['hero_name', map.hero.name ?? null]);
    inserts.push(['hero_tagline', map.hero.tagline ?? null]);
    inserts.push(['hero_subtagline', map.hero.subtagline ?? null]);
    inserts.push(['hero_photo', map.hero.photo ?? null]);
  }
  // about: {title, description, stats} -> home_about_*
  if (map.about && typeof map.about === 'object') {
    inserts.push(['home_about_heading', map.about.title ?? null]);
    inserts.push(['home_about_description', map.about.description ?? null]);
    if (Array.isArray(map.about.stats)) inserts.push(['home_stats', JSON.stringify(map.about.stats)]);
  }
  // contact: {email, phone, location, socials:{linkedin,twitter,instagram}}
  if (map.contact && typeof map.contact === 'object') {
    inserts.push(['email', map.contact.email ?? null]);
    inserts.push(['phone', map.contact.phone ?? null]);
    inserts.push(['location', map.contact.location ?? null]);
    if (map.contact.socials && typeof map.contact.socials === 'object') {
      const links = [];
      for (const [platform, url] of Object.entries(map.contact.socials)) {
        if (url) links.push({ platform: platform.charAt(0).toUpperCase() + platform.slice(1), url });
      }
      if (links.length) inserts.push(['social_links', JSON.stringify(links)]);
    }
  }
  // seo
  if (map.seo && typeof map.seo === 'object') {
    inserts.push(['seo_title', map.seo.title ?? null]);
    inserts.push(['seo_description', map.seo.description ?? null]);
  }
  // footer
  if (map.footer && typeof map.footer === 'object') {
    inserts.push(['footer_tagline', map.footer.tagline ?? null]);
    inserts.push(['footer_copyright', map.footer.copyright ?? null]);
    // location already handled but keep footer location distinct
    if (map.footer.location) inserts.push(['footer_location', map.footer.location]);
  }
  // journey: {education:[], work:[]}
  if (map.journey && typeof map.journey === 'object') {
    if (Array.isArray(map.journey.education)) inserts.push(['journey_education', JSON.stringify(map.journey.education)]);
    if (Array.isArray(map.journey.work)) inserts.push(['journey_work', JSON.stringify(map.journey.work)]);
  }

  // Fallbacks for required global keys if still missing
  inserts.push(['company_name', map.company_name ?? 'Emmanuel Amful Owusu']);
  inserts.push(['tagline', map.tagline ?? 'Technology. Knowledge. Leadership. Purpose.']);

  for (const [k, v] of inserts) {
    if (v == null) continue;
    await pool.query(
      `INSERT INTO "SiteSettings" (id, key, value, "updatedAt") VALUES (gen_random_uuid(), $1, $2, NOW()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, "updatedAt" = NOW()`,
      [k, v]
    );
    console.log(`Upserted ${k}`);
  }

  // Optionally remove old blob keys after successful flatten (keep for rollback)
  // await pool.query(`DELETE FROM "SiteSettings" WHERE key IN ('hero','about','contact','seo','footer','journey')`);
  console.log('Migration done. Flat keys inserted, old blobs retained for safety.');
}

try {
  await ensureColumn();
  await flatten();
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  await pool.end();
}
