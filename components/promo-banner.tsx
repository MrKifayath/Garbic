import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl my-12 md:my-16">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/banner-tech.jpg"
          alt="Premium Tech Banner"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Premium Electronics
            <br />
            <span className="text-accent">Special Offers</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Discover our latest collection of premium electronics at unbeatable prices. Shop now and get exclusive deals on all your favorite tech products.
          </p>
          <Link href="/#products">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all hover:shadow-lg hover:scale-105">
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
      
      {/* Optional: Add decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-accent/10 to-transparent rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
