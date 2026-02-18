const fs = require('fs');
const path = require('path');

// Read both files
const currentProducts = JSON.parse(fs.readFileSync('products.json', 'utf8'));
const newProducts = JSON.parse(fs.readFileSync('new-products-batch.json', 'utf8'));

// Merge them
const allProducts = [...currentProducts, ...newProducts];

// Write back
fs.writeFileSync('products.json', JSON.stringify(allProducts, null, 2));

console.log(`✓ Merged ${currentProducts.length} + ${newProducts.length} = ${allProducts.length} products`);
