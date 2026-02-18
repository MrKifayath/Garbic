'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShoppingCart, Heart, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { useState, use } from 'react';
import { useCart } from '@/lib/cart-context';
import productsData from '@/products.json';

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
const PRODUCTS_LIST = productsData
  .filter(p => p.image_url.startsWith('/products/'))
  .map((product, index) => ({
    id: String(index + 1),
    name: product.name,
    price: product.price_inr,
    image: product.image_url,
    category: getCategory(product.name),
    rating: 4.5 + (index % 5) * 0.1, // Deterministic rating
    reviews: 100 + (index * 37) % 400, // Deterministic reviews
    description: product.description,
    productUrl: product.product_url
  }));

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  // Unwrap params using React.use()
  const { id } = use(params);
  const productIndex = parseInt(id) - 1;
  const product = PRODUCTS_LIST[productIndex] || PRODUCTS_LIST[0];
  
  // Get 3 random related products
  const relatedProducts = PRODUCTS_LIST
    .filter((_, i) => i !== productIndex)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8 animate-fadeInUp">
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Image */}
          <div className="animate-slideInLeft">
            <div className="bg-muted rounded-xl h-96 overflow-hidden relative group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`absolute top-4 right-4 p-3 rounded-lg backdrop-blur-sm transition-all z-10 ${
                  isFavorite
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-background/50 text-foreground hover:bg-background/80'
                }`}
              >
                <Heart className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="animate-fadeInUp space-y-6">
            {/* Header */}
            <div>
              <p className="text-accent text-sm font-semibold uppercase tracking-wide">{product.category}</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-2xl ${i < Math.floor(product.rating) ? 'text-accent' : 'text-muted'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="border-t border-b border-border py-4">
              <p className="text-4xl font-bold text-accent">₹{product.price.toLocaleString('en-IN')}</p>
              <p className="text-sm text-muted-foreground mt-2">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-foreground">Quantity:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-muted border border-border rounded-lg hover:bg-border transition-colors"
                >
                  −
                </button>
                <span className="text-xl font-semibold text-foreground w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-muted border border-border rounded-lg hover:bg-border transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`grow py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:scale-105 ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-accent text-accent-foreground hover:bg-accent/90'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <Link href="/checkout">
                <button className="px-6 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-all">
                  Buy Now
                </button>
              </Link>
            </div>

            {/* Trust Section */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex flex-col items-center gap-2">
                <Truck className="w-6 h-6 text-accent" />
                <p className="text-xs text-muted-foreground text-center">Free Shipping Above ₹500</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-6 h-6 text-accent" />
                <p className="text-xs text-muted-foreground text-center">Secure Payment</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RotateCcw className="w-6 h-6 text-accent" />
                <p className="text-xs text-muted-foreground text-center">30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-card border border-border rounded-xl p-8 mb-16 animate-fadeInUp">
          <h2 className="text-2xl font-bold text-foreground mb-6">Product Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-border pb-4">
              <span className="font-semibold text-foreground">Category</span>
              <span className="text-muted-foreground">{product.category}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <span className="font-semibold text-foreground">Rating</span>
              <span className="text-muted-foreground">{product.rating.toFixed(1)} / 5.0</span>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <span className="font-semibold text-foreground">Reviews</span>
              <span className="text-muted-foreground">{product.reviews} customer reviews</span>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <span className="font-semibold text-foreground">Warranty</span>
              <span className="text-muted-foreground">1 Year Manufacturer Warranty</span>
            </div>
            <div className="flex justify-between pb-4">
              <span className="font-semibold text-foreground">Product Link</span>
              <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                View on Amazon/Flipkart
              </a>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="animate-fadeInUp">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
