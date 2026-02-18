const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Create public/products directory if it doesn't exist
const productsDir = path.join(__dirname, '..', 'public', 'products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
  console.log('✓ Created public/products directory');
}

// Function to download image with bot protection bypass
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    if (!url || url.startsWith('/')) {
      reject(new Error('Invalid URL'));
      return;
    }

    const protocol = url.startsWith('https') ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-IN,en-US;q=0.9,en;q=0.8',
        'Accept-Encoding': 'identity',
        'Referer': url.includes('amazon') ? 'https://www.amazon.in/' : url.includes('flipkart') ? 'https://www.flipkart.com/' : '',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'DNT': '1',
        'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site'
      }
    };

    protocol.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        // Handle redirects
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl, filepath)
            .then(resolve)
            .catch(reject);
        } else {
          reject(new Error('Redirect without location'));
        }
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

// Add delay between requests to avoid rate limiting
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processProducts() {
  try {
    // Read products.json
    const productsPath = path.join(__dirname, '..', 'products.json');
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

    console.log(`\n📦 Processing ${productsData.length} products...\n`);

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

        // Generate filename from product name
        const filename = `${Date.now()}-${i}.jpg`;
        const filepath = path.join(productsDir, filename);

        // Download image
        await downloadImage(product.image_url, filepath);
        console.log(`  ✓ Downloaded image: ${filename}`);
        downloadedCount++;

        // Update product with local image path
        updatedProducts.push({
          ...product,
          image_url: `/products/${filename}`
        });

        // Add delay to avoid rate limiting (1 second between requests)
        if (i < productsData.length - 1) {
          await delay(1000);
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
  }
}

processProducts();
