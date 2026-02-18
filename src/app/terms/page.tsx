'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TermsPage: React.FC = () => {
  const lastUpdated = 'January 18, 2025';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-slate-300">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="bg-slate-700 border border-slate-600 rounded-lg shadow-xl p-8">
          <div className="prose prose-lg max-w-none text-slate-200">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">1. Introduction</h2>
              <p className="text-slate-300 mb-4">
                Welcome to our e-commerce platform (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms and Conditions (&quot;Terms&quot;) govern your use of our website and services (the &quot;Service&quot;).
              </p>
              <p className="text-slate-300">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">2. Acceptance of Terms</h2>
              <p className="text-slate-300 mb-4">
                By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. When using particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </section>

            {/* Account Registration */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">3. Account Registration</h2>
              <p className="text-slate-300 mb-4">
                To access certain features, you must create an account. You must provide accurate, complete, and current information. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-slate-300 mb-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your account information remains accurate and up-to-date</li>
              </ul>
            </section>

            {/* Products and Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">4. Products and Services</h2>
              <p className="text-slate-300 mb-4">
                We offer various products through our platform. All product descriptions, images, and specifications are provided for informational purposes and may be subject to change.
              </p>
              <p className="text-slate-300 mb-4">
                We reserve the right to:
              </p>
              <ul className="list-disc pl-6 text-slate-300 mb-4">
                <li>Limit quantities of any products</li>
                <li>Modify or discontinue products without notice</li>
                <li>Refuse service to anyone for any reason</li>
                <li>Change prices at any time without prior notice</li>
              </ul>
            </section>

            {/* Orders and Payment */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">5. Orders and Payment</h2>
              <p className="text-slate-300 mb-4">
                When you place an order, you agree to provide accurate payment information. We accept various payment methods including credit cards, debit cards, and digital wallets.
              </p>
              <p className="text-slate-300 mb-4">
                Order acceptance is subject to:
              </p>
              <ul className="list-disc pl-6 text-slate-300 mb-4">
                <li>Product availability</li>
                <li>Payment verification</li>
                <li>Address verification</li>
                <li>Our internal fraud prevention checks</li>
              </ul>
              <p className="text-slate-300">
                We reserve the right to cancel any order for any reason, including suspected fraudulent activity.
              </p>
            </section>

            {/* Shipping and Delivery */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">6. Shipping and Delivery</h2>
              <p className="text-slate-300 mb-4">
                We ship to addresses within India. Delivery times are estimates and may vary based on location and product availability.
              </p>
              <p className="text-slate-300 mb-4">
                Shipping terms:
              </p>
              <ul className="list-disc pl-6 text-slate-300 mb-4">
                <li>Free shipping on orders above ₹500</li>
                <li>Standard delivery: 2-7 business days</li>
                <li>Express delivery: 1-3 business days (additional charges apply)</li>
                <li>Risk of loss transfers to you upon delivery to the carrier</li>
              </ul>
            </section>

            {/* Returns and Refunds */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">7. Returns and Refunds</h2>
              <p className="text-slate-300 mb-4">
                We offer a 30-day return policy for most items. Please refer to our detailed Refund Policy for complete terms and conditions regarding returns, exchanges, and refunds.
              </p>
              <p className="text-slate-300">
                Items must be returned in original condition with all packaging and accessories.
              </p>
            </section>

            {/* User Conduct */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">8. User Conduct</h2>
              <p className="text-slate-300 mb-4">
                You agree not to use our Service for any unlawful purpose or in any way that could damage our reputation or business. Prohibited activities include:
              </p>
              <ul className="list-disc pl-6 text-slate-300 mb-4">
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
                <li>Transmitting harmful code or malware</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Harassing other users or our staff</li>
              </ul>
            </section>

            {/* Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">9. Privacy Policy</h2>
              <p className="text-slate-300 mb-4">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service.
              </p>
              <p className="text-slate-300">
                By using our Service, you consent to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">10. Intellectual Property</h2>
              <p className="text-slate-300 mb-4">
                All content on our website, including text, graphics, logos, images, and software, is our property or licensed to us and is protected by copyright and other intellectual property laws.
              </p>
              <p className="text-slate-300">
                You may not reproduce, distribute, or create derivative works from our content without explicit written permission.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">11. Limitation of Liability</h2>
              <p className="text-slate-300 mb-4">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our Service.
              </p>
              <p className="text-slate-300">
                Our total liability shall not exceed the amount you paid for the specific product or service that gave rise to the claim.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">12. Governing Law</h2>
              <p className="text-slate-300 mb-4">
                These Terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, India.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">13. Changes to Terms</h2>
              <p className="text-slate-300 mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on our website with a new effective date.
              </p>
              <p className="text-slate-300">
                Your continued use of the Service after changes become effective constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">14. Contact Information</h2>
              <p className="text-slate-300 mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-slate-600 border border-slate-500 p-4 rounded-md">
                <p className="text-slate-200 mb-2"><strong>Customer Support</strong></p>
                <p className="text-slate-300 mb-2">Email: tufolindia@gmail.com</p>
                <p className="text-slate-300 mb-2">Phone: +91 98311100889</p>
                <p className="text-slate-300 mb-2">Address: 4-38-17/B, Deenabandu Colony</p>
                <p className="text-slate-300 mb-2">Jagathgiri Gutta, Hyderabad</p>
                <p className="text-slate-300">Telangana 500037, India</p>
              </div>
            </section>
          </div>
        </div>

        {/* Back to top */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            variant="outline"
            className="border-slate-500 text-slate-200 hover:bg-slate-600"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;