'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="Garbic"
              width={1440}
              height={400}
              className="h-[250px] w-auto"
            />
            <p className="text-sm text-primary-foreground/80">
              Premium electronics and gadgets at the best prices. Electronics. Made Easy.
            </p>
            <div className="flex gap-4">
              {/* Social Links */}
              <a href="#" className="text-primary-foreground hover:text-accent transition-colors">
                <span className="text-xl">f</span>
              </a>
              <a href="#" className="text-primary-foreground hover:text-accent transition-colors">
                <span className="text-xl">𝕏</span>
              </a>
              <a href="#" className="text-primary-foreground hover:text-accent transition-colors">
                <span className="text-xl">📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#products" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <a href="#privacy" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                <a href="tel:+919831665130" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  +91 98316 65130
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                <a href="mailto:support@garbic.com" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  support@garbic.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                <span className="text-primary-foreground/80">
                  H. No. 2-1-305, Venkataramana Apartments, Vidyanagar Nallakunta Main Road, Old Nallakunta, Hyderabad, Telangana 500044
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 py-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-primary-foreground/70 text-sm">
            © {currentYear} Garbic Electronics. All rights reserved. GSTIN: 36AAMCG6094P1ZO
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <Link href="/terms" className="text-primary-foreground/70 hover:text-accent transition-colors">
              Terms
            </Link>
            <Link href="/refund" className="text-primary-foreground/70 hover:text-accent transition-colors">
              Refund
            </Link>
            <Link href="/cancellation" className="text-primary-foreground/70 hover:text-accent transition-colors">
              Cancellation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
