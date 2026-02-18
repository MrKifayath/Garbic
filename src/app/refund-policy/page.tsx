'use client';

import React from 'react';
import { ArrowUp, RefreshCw, Clock, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RefundPolicyPage: React.FC = () => {
  const lastUpdated = 'January 18, 2025';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <RefreshCw className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent mb-4">
            Refund Policy
          </h1>
          <p className="text-lg text-slate-300">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="bg-slate-700 border border-slate-600 rounded-lg shadow-xl p-8">
          <div className="prose prose-lg max-w-none text-slate-200">
            {/* Overview */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Overview</h2>
              <p className="text-slate-300 mb-4">
                We want you to be completely satisfied with your purchase. If you're not happy with your order, we offer a comprehensive refund and return policy to ensure your peace of mind.
              </p>
              <div className="bg-primary-600/20 border border-primary-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-primary-300 font-medium">30-Day Money-Back Guarantee</p>
                    <p className="text-primary-200 text-sm mt-1">
                      We offer a full 30-day return window for most items, no questions asked.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Return Window */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Return Window</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-green-400 mr-2" />
                    <h3 className="font-semibold text-slate-100">Standard Items</h3>
                  </div>
                  <p className="text-slate-300 text-sm">30 days from delivery date</p>
                </div>
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                    <h3 className="font-semibold text-slate-100">Electronics</h3>
                  </div>
                  <p className="text-slate-300 text-sm">15 days from delivery date</p>
                </div>
              </div>
              <p className="text-slate-300">
                The return window starts from the date you receive your item(s). For multiple items in one order, the return window applies to each item individually.
              </p>
            </section>

            {/* Eligible Items */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Eligible Items for Return</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">✅ Returnable Items</h3>
                  <ul className="list-disc pl-6 text-slate-300 space-y-1">
                    <li>Items in original, unused condition</li>
                    <li>Items with original packaging and tags</li>
                    <li>Items with all accessories and manuals</li>
                    <li>Non-personalized items</li>
                    <li>Items not damaged by normal wear and tear</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">❌ Non-Returnable Items</h3>
                  <ul className="list-disc pl-6 text-slate-300 space-y-1">
                    <li>Personalized or customized items</li>
                    <li>Perishable goods</li>
                    <li>Intimate or sanitary goods</li>
                    <li>Items damaged by misuse or normal wear</li>
                    <li>Digital products or software</li>
                    <li>Gift cards or vouchers</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Return Process */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">How to Return Items</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-1">Initiate Return Request</h3>
                    <p className="text-slate-300 text-sm">
                      Contact our customer support team via email or phone to initiate your return request. Provide your order number and reason for return.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-1">Receive Return Authorization</h3>
                    <p className="text-slate-300 text-sm">
                      We'll provide you with a Return Authorization Number (RAN) and return shipping instructions within 24 hours.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-1">Package and Ship</h3>
                    <p className="text-slate-300 text-sm">
                      Pack the item securely in its original packaging. Include the RAN and any accessories. Ship using the provided return label.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-1">Refund Processing</h3>
                    <p className="text-slate-300 text-sm">
                      Once we receive and inspect your return, we'll process your refund within 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Methods */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Refund Methods</h2>
              <p className="text-slate-300 mb-4">
                Refunds will be processed using the same payment method used for the original purchase:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Credit/Debit Cards</h3>
                  <p className="text-slate-300 text-sm">3-7 business days to appear on your statement</p>
                </div>
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Digital Wallets</h3>
                  <p className="text-slate-300 text-sm">1-3 business days to reflect in your wallet</p>
                </div>
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Bank Transfer</h3>
                  <p className="text-slate-300 text-sm">3-5 business days to credit your account</p>
                </div>
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Store Credit</h3>
                  <p className="text-slate-300 text-sm">Instant credit to your account</p>
                </div>
              </div>
            </section>

            {/* Shipping Costs */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Return Shipping Costs</h2>
              <div className="space-y-4">
                <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
                  <h3 className="font-semibold text-green-300 mb-2">Free Return Shipping</h3>
                  <ul className="text-green-200 text-sm space-y-1">
                    <li>• Defective or damaged items</li>
                    <li>• Wrong item sent</li>
                    <li>• Items not as described</li>
                  </ul>
                </div>
                <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-300 mb-2">Customer Pays Return Shipping</h3>
                  <ul className="text-yellow-200 text-sm space-y-1">
                    <li>• Change of mind returns</li>
                    <li>• Size or color exchanges</li>
                    <li>• Items ordered by mistake</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Exchanges */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Exchanges</h2>
              <p className="text-slate-300 mb-4">
                We offer exchanges for size, color, or similar items within the same price range. Exchange requests must be made within the return window.
              </p>
              <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                <h3 className="font-semibold text-slate-100 mb-2">Exchange Process</h3>
                <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-1">
                  <li>Contact customer support to request an exchange</li>
                  <li>Return the original item following our return process</li>
                  <li>Place a new order for the desired item</li>
                  <li>We'll refund the original item once received</li>
                </ol>
              </div>
            </section>

            {/* Damaged Items */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Damaged or Defective Items</h2>
              <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-300 font-medium">Report Damage Immediately</p>
                    <p className="text-red-200 text-sm mt-1">
                      Contact us within 48 hours of delivery for damaged or defective items.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 mb-4">
                For damaged or defective items, we offer:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-1">
                <li>Full refund including original shipping costs</li>
                <li>Free return shipping</li>
                <li>Replacement item at no additional cost</li>
                <li>Expedited processing (24-48 hours)</li>
              </ul>
            </section>

            {/* Partial Refunds */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Partial Refunds</h2>
              <p className="text-slate-300 mb-4">
                In certain situations, partial refunds may be granted:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-1">
                <li>Items with obvious signs of use</li>
                <li>Items returned more than 30 days after delivery</li>
                <li>Items missing original packaging or accessories</li>
                <li>Items with minor damage not caused by shipping</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Contact Us for Returns</h2>
              <p className="text-slate-300 mb-4">
                Need help with a return? Our customer support team is here to assist you:
              </p>
              <div className="bg-slate-600 border border-slate-500 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-200 font-medium mb-2">Customer Support</p>
                    <p className="text-slate-300 text-sm mb-1">Email: tufolindia@gmail.com</p>
                    <p className="text-slate-300 text-sm mb-1">Phone: +91 98311100889</p>
                    <p className="text-slate-300 text-sm">Hours: Mon-Fri, 9:00 AM - 6:00 PM IST</p>
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium mb-2">Return Address</p>
                    <p className="text-slate-300 text-sm mb-1">Returns Department</p>
                    <p className="text-slate-300 text-sm mb-1">4-38-17/B, Deenabandu Colony</p>
                    <p className="text-slate-300 text-sm mb-1">Jagathgiri Gutta, Hyderabad</p>
                    <p className="text-slate-300 text-sm">Telangana 500037, India</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Policy Updates */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Policy Updates</h2>
              <p className="text-slate-300 mb-4">
                We may update this Refund Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
              <p className="text-slate-300">
                Your continued use of our services after any changes indicates your acceptance of the updated policy.
              </p>
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

export default RefundPolicyPage;