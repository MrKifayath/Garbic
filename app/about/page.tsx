'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Shield, Truck, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-accent/10 via-background to-background py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fadeInUp">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                About <span className="text-accent">Garbic Electronics</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your trusted destination for quality electronics and gadgets at unbeatable prices
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slideInLeft">
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Founded with a passion for technology and a commitment to customer satisfaction, Garbic Electronics has become a trusted name in the electronics retail space. We believe that everyone deserves access to quality electronics without breaking the bank.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Our carefully curated selection features the latest gadgets, accessories, and electronics from top brands, all at competitive prices. We work directly with manufacturers and authorized distributors to ensure authenticity and quality.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With thousands of satisfied customers across India, we continue to grow and evolve, always keeping our customers' needs at the heart of everything we do.
                </p>
              </div>
              <div className="animate-fadeInUp">
                <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl p-8 border border-accent/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">5000+</div>
                      <div className="text-sm text-muted-foreground">Happy Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">100+</div>
                      <div className="text-sm text-muted-foreground">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                      <div className="text-sm text-muted-foreground">Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">100%</div>
                      <div className="text-sm text-muted-foreground">Authentic</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fadeInUp">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing the best shopping experience with quality products and exceptional service
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all animate-fadeInUp">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">100% Authentic</h3>
                <p className="text-sm text-muted-foreground">
                  All products are sourced from authorized distributors and come with manufacturer warranty
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Quick and reliable shipping across India with real-time tracking
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Best Prices</h3>
                <p className="text-sm text-muted-foreground">
                  Competitive pricing with regular deals and discounts on top brands
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated customer support team ready to help you anytime
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-xl p-8 animate-slideInLeft">
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To make quality electronics accessible to everyone by offering authentic products at competitive prices, backed by excellent customer service and support. We strive to be the go-to destination for tech enthusiasts and everyday consumers alike.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 animate-slideInRight">
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become India's most trusted electronics retailer, known for our commitment to quality, authenticity, and customer satisfaction. We aim to continuously expand our product range while maintaining the highest standards of service.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
