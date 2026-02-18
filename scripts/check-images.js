const fs = require('fs');
const products = require('../products.json');

console.log('\nChecking for missing images...\n');

let missing = 0;
let found = 0;

products.forEach((prod, i) => {
  if (prod.image_url.startsWith('/products/')) {
    const path = 'public' + prod.image_url;
    if (!fs.existsSync(path)) {
      console.log(`✗ Missing: ${prod.image_url} - ${prod.name}`);
      missing++;
    } else {
      found++;
    }
  }
});

console.log(`\n✓ Found: ${found}`);
console.log(`✗ Missing: ${missing}`);
console.log(`Total: ${found + missing}\n`);
