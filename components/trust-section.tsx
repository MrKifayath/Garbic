import Image from 'next/image';
import { CheckCircle, Award, Users, Zap } from 'lucide-react';

export default function TrustSection() {
  const trustItems = [
    {
      icon: CheckCircle,
      title: '100% Authentic',
      description: 'All products are 100% genuine and original'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Handpicked products from trusted brands'
    },
    {
      icon: Users,
      title: '10000+ Happy Customers',
      description: 'Trusted by thousands of customers across India'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping within 5-7 business days'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-accent">Garbic?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to delivering the best electronics shopping experience with quality products and excellent customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-card rounded-xl border border-border hover:border-accent/50 transition-all hover:shadow-lg hover:scale-105 text-center animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-accent mb-2">30 Days</p>
            <p className="text-foreground font-semibold mb-2">Easy Returns</p>
            <p className="text-muted-foreground text-sm">Hassle-free return policy for all products</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-accent mb-2">₹0</p>
            <p className="text-foreground font-semibold mb-2">Hidden Charges</p>
            <p className="text-muted-foreground text-sm">Transparent pricing with no surprise costs</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-accent mb-2">24/7</p>
            <p className="text-foreground font-semibold mb-2">Customer Support</p>
            <p className="text-muted-foreground text-sm">Always here to help with your queries</p>
          </div>
        </div>
      </div>
    </section>
  );
}
