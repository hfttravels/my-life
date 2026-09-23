/* eslint-disable @typescript-eslint/no-require-imports */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_v5HdchzbTZ1B@ep-little-flower-apofrzdz-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require');
async function test() {
  try {
    const res = await sql.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'payload'");
    console.log('Payload tables:', res.map(r => r.table_name));
    const media = await sql.query("SELECT * FROM payload.media LIMIT 5");
    console.log('Media count in table:', media.length);
    const mediaCols = await sql.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'payload' AND table_name = 'media'");
    console.log('Media columns:', mediaCols.map(c => `${c.column_name} (${c.data_type})`));
  } catch(e) {
    console.error('Error:', e);
  }
}
test();
