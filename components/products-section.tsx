'use client';

import ProductCard from './product-card';
import { Zap } from 'lucide-react';
import productsData from '@/products.json';
import Link from 'next/link';

// Helper function to categorize products
function getCategory(name: string): string {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('earphone') || nameLower.includes('earbud') || nameLower.includes('headphone') || nameLower.includes('headset')) return 'Audio';
  if (nameLower.includes('mouse')) return 'Mouse';
  if (nameLower.includes('keyboard')) return 'Keyboard';
  if (nameLower.includes('power bank')) return 'Power Banks';
  if (nameLower.includes('charger') || nameLower.includes('adapter')) return 'Chargers';
  if (nameLower.includes('cable')) return 'Cables';
  if (nameLower.includes('speaker')) return 'Speakers';
  if (nameLower.includes('wifi') || nameLower.includes('router') || nameLower.includes('switch')) return 'Networking';
  if (nameLower.includes('watch')) return 'Wearables';
  if (nameLower.includes('memory') || nameLower.includes('flash') || nameLower.includes('usb')) return 'Storage';
  if (nameLower.includes('stand') || nameLower.includes('holder') || nameLower.includes('cooler')) return 'Accessories';
  return 'Electronics';
}

// Transform products data
const PRODUCTS = productsData
  .filter(p => p.image_url.startsWith('/products/')) // Only show products with downloaded images
  .map((product, index) => ({
    id: String(index + 1),
    name: product.name,
    price: product.price_inr,
    image: product.image_url,
    category: getCategory(product.name),
    rating: 4.5 + (index % 5) * 0.1, // Deterministic rating between 4.5-4.9
    reviews: 100 + (index * 37) % 400 // Deterministic reviews between 100-500
  }));

export default function ProductsSection() {
  return (
    <section id="products" className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-6 border border-accent/30">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Featured Collection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Best <span className="text-accent">Electronics</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked premium electronics and gadgets at unbeatable prices. Everything you need in one place.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 12).map((product, index) => (
            <div 
              key={product.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Showing 12 of {PRODUCTS.length} products</p>
          <Link href="/products">
            <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all hover:shadow-lg hover:scale-105">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
