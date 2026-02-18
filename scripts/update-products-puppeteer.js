const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Create public/products directory if it doesn't exist
const productsDir = path.join(__dirname, '..', 'public', 'products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
  console.log('✓ Created public/products directory');
}

// Add delay between requests
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadImageWithPuppeteer(browser, url, filepath) {
  const page = await browser.newPage();
  
  try {
    // Set realistic viewport and user agent
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    
    // Navigate to the image URL
    const response = await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    if (!response || response.status() !== 200) {
      throw new Error(`Failed to load: ${response ? response.status() : 'no response'}`);
    }

    // Get the image buffer
    const buffer = await response.buffer();
    
    // Save to file
    fs.writeFileSync(filepath, buffer);
    
    await page.close();
    return true;
  } catch (error) {
    await page.close();
    throw error;
  }
}

async function processProducts() {
  let browser;
  
  try {
    console.log('\n🚀 Launching browser...\n');
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ]
    });

    // Read products.json
    const productsPath = path.join(__dirname, '..', 'products.json');
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

    console.log(`📦 Processing ${productsData.length} products...\n`);

    const updatedProducts = [];
    let downloadedCount = 0;
    let skippedCount = 0;
    let failedCount = 0;

    for (let i = 0; i < productsData.length; i++) {
      const product = productsData[i];
      console.log(`[${i + 1}/${productsData.length}] ${product.name}`);

      try {
        // Skip if already a local path
        if (product.image_url.startsWith('/products/')) {
          console.log(`  ⊘ Already downloaded, skipping`);
          updatedProducts.push(product);
          skippedCount++;
          continue;
        }

        // Generate filename
        const filename = `${Date.now()}-${i}.jpg`;
        const filepath = path.join(productsDir, filename);

        // Download image with Puppeteer
        await downloadImageWithPuppeteer(browser, product.image_url, filepath);
        console.log(`  ✓ Downloaded: ${filename}`);
        downloadedCount++;

        // Update product with local image path
        updatedProducts.push({
          ...product,
          image_url: `/products/${filename}`
        });

        // Add delay to avoid rate limiting (2 seconds)
        if (i < productsData.length - 1) {
          await delay(2000);
        }
      } catch (error) {
        console.error(`  ✗ Error: ${error.message}`);
        failedCount++;
        // Keep original URL if download fails
        updatedProducts.push(product);
      }
    }

    // Write updated products.json
    fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2));
    console.log(`\n✓ Updated products.json with ${updatedProducts.length} products`);
    console.log(`  Downloaded: ${downloadedCount} | Skipped: ${skippedCount} | Failed: ${failedCount}`);
    console.log('✓ All done!\n');

  } catch (error) {
    console.error('Error processing products:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

processProducts();
