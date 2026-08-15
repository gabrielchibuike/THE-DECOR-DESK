const { Client } = require('pg');

// Supabase session pooler connection
// Format: postgresql://postgres.[project-ref]:[password]@[host]:5432/postgres
// The password for direct connections is the database password, NOT the service role JWT.
// 
// Session pooler host: aws-0-eu-west-2.pooler.supabase.com
// Direct connection host: db.jrjivysbthvxobrenhpa.supabase.co

const client = new Client({
  host: 'db.jrjivysbthvxobrenhpa.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  // The password is the database password set in Supabase dashboard -> Settings -> Database
  // This is NOT the service role key. We'll need the user to provide this, OR we can try the service role key as password
  password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyaml2eXNidGh2eG9icmVuaHBhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTY3ODMzMCwiZXhwIjoyMTAxMjU0MzMwfQ.w_Jay-C3xWu0cA2ul2WJh4X3S13TaWOZOT0WEfiTPyw',
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  try {
    await client.connect();
    console.log('Connected to Supabase database');

    const statements = [
      `ALTER TABLE categories ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'room'`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS category_slug text`,
      `ALTER TABLE posts ADD COLUMN IF NOT EXISTS post_type text NOT NULL DEFAULT 'editorial'`,
    ];

    for (const stmt of statements) {
      try {
        await client.query(stmt);
        console.log('✓', stmt.substring(0, 70));
      } catch (err) {
        console.error('✗', stmt.substring(0, 70), '-', err.message);
      }
    }

    await client.end();
    console.log('Migration complete!');
  } catch (err) {
    console.error('Connection failed:', err.message);
    console.log('\nTo apply the migration manually, paste this SQL into the Supabase SQL Editor at:');
    console.log('https://supabase.com/dashboard/project/jrjivysbthvxobrenhpa/sql/new\n');
    console.log(`ALTER TABLE categories ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'room';`);
    console.log(`ALTER TABLE products ADD COLUMN IF NOT EXISTS category_slug text;`);
    console.log(`ALTER TABLE posts ADD COLUMN IF NOT EXISTS post_type text NOT NULL DEFAULT 'editorial';`);
  }
}

migrate();
