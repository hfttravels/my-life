const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_v5HdchzbTZ1B@ep-little-flower-apofrzdz-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function testInsert() {
  const query = `
    INSERT INTO payload.media (
      alt, filename, mime_type, filesize, width, height,
      focal_x, focal_y, url,
      sizes_thumbnail_url, sizes_thumbnail_width, sizes_thumbnail_height, sizes_thumbnail_mime_type, sizes_thumbnail_filesize, sizes_thumbnail_filename,
      created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9,
      $10, $11, $12, $13, $14, $15,
      NOW(), NOW()
    ) RETURNING id, filename, alt;
  `;
  const params = [
    'Beach Resort and Tropical Waters',
    'dest-beach.jpg',
    'image/jpeg',
    248731,
    1376,
    768,
    50,
    50,
    '/media/dest-beach.jpg',
    '/media/dest-beach-400x300.jpg',
    400,
    300,
    'image/jpeg',
    30181,
    'dest-beach-400x300.jpg'
  ];
  try {
    const res = await sql.query(query, params);
    console.log('Successfully inserted test row:', res);
  } catch (err) {
    console.error('Insert error:', err);
  }
}

testInsert();
