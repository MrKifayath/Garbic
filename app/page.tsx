import Header from '@/components/header';
import Hero from '@/components/hero';
import ProductsSection from '@/components/products-section';
import PromoBanner from '@/components/promo-banner';
import TrustSection from '@/components/trust-section';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ShoppingCart, Zap, Truck, Shield } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShoppingCart,
                title: 'Easy Shopping',
                description: 'Browse and shop with our intuitive interface'
              },
              {
                icon: Zap,
                title: 'Fast Delivery',
                description: 'Quick and reliable shipping across India'
              },
              {
                icon: Truck,
                title: 'Free Shipping',
                description: 'On orders above ₹500'
              },
              {
                icon: Shield,
                title: 'Secure Payment',
                description: '100% safe and encrypted transactions'
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 bg-card rounded-xl border border-border hover:border-accent/50 transition-all hover:shadow-lg animate-fadeInUp"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <ProductsSection />

      {/* Promo Banner */}
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromoBanner />
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Upgrade Your Tech?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our collection of premium electronics and find the perfect gadget for you.
          </p>
          <Link
            href="/#products"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all hover:shadow-lg hover:scale-105"
          >
            Browse All Products
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
