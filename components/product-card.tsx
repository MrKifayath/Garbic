'use client';

import Link from 'next/link';
import { ShoppingCart, Heart, Check } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import Toast from './toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  rating,
  reviews
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, price, image });
    setAddedToCart(true);
    setShowToast(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-accent/50">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted h-48 flex items-center justify-center">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-lg backdrop-blur-sm transition-all ${
              isFavorite
                ? 'bg-accent text-accent-foreground'
                : 'bg-background/50 text-foreground hover:bg-background/80'
            }`}
          >
            <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs font-semibold text-accent uppercase tracking-wide">{category}</p>
          <Link href={`/product/${id}`}>
            <h3 className="text-foreground font-semibold mt-2 line-clamp-2 hover:text-accent transition-colors">
              {name}
            </h3>
          </Link>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < Math.floor(rating) ? 'text-accent' : 'text-muted'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xl font-bold text-foreground">₹{price.toLocaleString('en-IN')}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={addedToCart}
            className={`p-2 rounded-lg transition-all hover:shadow-md hover:scale-105 ${
              addedToCart
                ? 'bg-green-500 text-white'
                : 'bg-accent text-accent-foreground hover:bg-accent/90'
            }`}
          >
            {addedToCart ? (
              <Check className="w-5 h-5" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <Toast
        message={`${name} added to cart!`}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
