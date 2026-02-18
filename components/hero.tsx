'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slideInLeft space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-6 border border-accent/30">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Latest Electronics at Best Prices</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Electronics.
                <br />
                <span className="text-accent animate-glow">Made Easy.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Discover premium electronics and gadgets at unbeatable prices. From smartphones to accessories, we have everything you need.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all hover:shadow-lg hover:scale-105"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-all"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div>
                <p className="text-2xl font-bold text-accent">100%</p>
                <p className="text-sm text-muted-foreground">Authentic</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">₹300</p>
                <p className="text-sm text-muted-foreground">Min Price</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden md:block">
            <div className="relative w-full h-96 animate-float rounded-2xl overflow-hidden">
              {/* Gradient Blob Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl blur-3xl animate-pulse"></div>
              
              {/* Premium Image */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-accent/30">
                <Image
                  src="/hero-electronics.jpg"
                  alt="Premium Electronics Collection"
                  fill
                  className="object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
