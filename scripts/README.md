# Product Update Script

This script downloads product images and updates the products.json file.

## Usage

1. Update `products.json` with your new products (name, description, price_inr, image_url, product_url)
2. Run the script:

```bash
npm run update-products
```

## What it does

- Creates `public/products` directory if it doesn't exist
- Downloads all images from the URLs in products.json
- Bypasses bot protection with proper headers
- Adds delays between requests to avoid rate limiting
- Updates products.json with local image paths
- Handles errors gracefully (keeps original URL if download fails)

## Features

- User-agent spoofing to bypass bot detection
- Proper referer headers for Amazon/Flipkart
- Automatic redirect handling
- 500ms delay between requests to avoid rate limiting
- Unique filenames using timestamps

## Notes

- Images are saved as JPG files in `public/products/`
- Original remote URLs are replaced with local paths like `/products/filename.jpg`
- If a download fails, the original URL is kept
