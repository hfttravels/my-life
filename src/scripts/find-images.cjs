/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', '..');
const searchDirs = ['src'];

const imageSet = new Set();
const regex = /['"](\/(?:images|dest-|hero-bg)[^'"]+\.(?:jpg|jpeg|png|webp|svg))['"]/gi;

function walk(dir) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const p = path.join(dir, item);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.next' && item !== '.git') {
        walk(p);
      }
    } else if (/\.(tsx|ts|jsx|js|mjs|cjs)$/.test(item)) {
      const content = fs.readFileSync(p, 'utf8');
      let match;
      while ((match = regex.exec(content)) !== null) {
        imageSet.add(match[1]);
      }
    }
  }
}

for (const dir of searchDirs) {
  walk(path.join(baseDir, dir));
}

console.log('Total referenced images found across src/:', imageSet.size);

const verified = [];
const missing = [];

for (const imgPath of imageSet) {
  const localFile = path.join(baseDir, 'public', imgPath.replace(/^\//, ''));
  if (fs.existsSync(localFile)) {
    const stats = fs.statSync(localFile);
    verified.push({ imgPath, localFile, size: stats.size });
  } else {
    missing.push(imgPath);
  }
}

console.log('Verified existing on disk in public/:', verified.length);
console.log('Missing from public/:', missing.length);
console.log('List of all verified images:', verified.map(v => v.imgPath));
if (missing.length > 0) {
  console.log('Sample missing:', missing);
}
