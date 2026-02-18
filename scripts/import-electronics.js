const fs = require('fs');
const path = require('path');

// Read electronics data
const electronicsData = JSON.parse(fs.readFileSync('electronics-temp.json', 'utf8'));

// Read current products
const currentProducts = JSON.parse(fs.readFileSync('products.json', 'utf8'));

console.log(`\n📦 Importing ${electronicsData.length} electronics products...\n`);

// Transform and add electronics products
const newProducts = electronicsData.map((product, index) => {
  // Get the first image path
  const srcImagePath = product.images[0].replace('/images/', 'public/images/');
  const imageName = path.basename(srcImagePath);
  const destImagePath = `public/products/${product.id}-${imageName}`;
  
  // Copy image if it exists
  try {
    if (fs.existsSync(srcImagePath)) {
      fs.copyFileSync(srcImagePath, destImagePath);
      console.log(`✓ Copied: ${imageName}`);
    } else {
      console.log(`✗ Not found: ${srcImagePath}`);
    }
  } catch (error) {
    console.log(`✗ Error copying ${imageName}: ${error.message}`);
  }
  
  // Transform to our format
  return {
    name: product.name,
    description: product.description,
    price_inr: product.price,
    image_url: `/products/${product.id}-${imageName}`,
    product_url: `https://www.amazon.in/dp/${product.id}` // Placeholder URL
  };
});

// Merge with existing products
const allProducts = [...currentProducts, ...newProducts];

// Write back
fs.writeFileSync('products.json', JSON.stringify(allProducts, null, 2));

console.log(`\n✓ Added ${newProducts.length} electronics products`);
console.log(`✓ Total products: ${allProducts.length}\n`);
