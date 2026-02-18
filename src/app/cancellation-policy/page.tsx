'use client';

import React from 'react';
import { ArrowUp, XCircle, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CancellationPolicyPage: React.FC = () => {
  const lastUpdated = 'January 18, 2025';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <XCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent mb-4">
            Cancellation Policy
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
                We understand that sometimes you may need to cancel your order. This policy outlines when and how you can cancel orders, and what to expect in different scenarios.
              </p>
              <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-green-300 font-medium">Free Cancellation Available</p>
                    <p className="text-green-200 text-sm mt-1">
                      Cancel your order for free before it's processed and shipped.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cancellation Window */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">When You Can Cancel</h2>
              <div className="space-y-4">
                <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    <h3 className="font-semibold text-green-300">Free Cancellation</h3>
                  </div>
                  <p className="text-green-200 text-sm mb-2">
                    <strong>Before Order Processing:</strong> Cancel anytime before your order is processed (usually within 2-4 hours of placing the order).
                  </p>
                  <ul className="text-green-200 text-sm space-y-1">
                    <li>• 100% refund guaranteed</li>
                    <li>• No cancellation fees</li>
                    <li>• Instant cancellation available</li>
                  </ul>
                </div>

                <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                    <h3 className="font-semibold text-yellow-300">Partial Cancellation</h3>
                  </div>
                  <p className="text-yellow-200 text-sm mb-2">
                    <strong>After Processing, Before Shipping:</strong> Order is being prepared but hasn't shipped yet.
                  </p>
                  <ul className="text-yellow-200 text-sm space-y-1">
                    <li>• May incur processing fees</li>
                    <li>• Refund minus any applicable charges</li>
                    <li>• Requires customer support assistance</li>
                  </ul>
                </div>

                <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <XCircle className="w-5 h-5 text-red-400 mr-2" />
                    <h3 className="font-semibold text-red-300">Limited Cancellation</h3>
                  </div>
                  <p className="text-red-200 text-sm mb-2">
                    <strong>After Shipping:</strong> Order has been dispatched and is in transit.
                  </p>
                  <ul className="text-red-200 text-sm space-y-1">
                    <li>• Cannot be cancelled</li>
                    <li>• Must follow return policy instead</li>
                    <li>• Return shipping charges may apply</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Order Status Guide */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Order Status Guide</h2>
              <p className="text-slate-300 mb-4">
                Understanding your order status helps determine cancellation options:
              </p>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-slate-600 border border-slate-500 rounded-lg">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                  <div>
                    <span className="font-medium text-slate-100">Order Placed</span>
                    <span className="text-slate-300 text-sm ml-2">- Free cancellation available</span>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-slate-600 border border-slate-500 rounded-lg">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                  <div>
                    <span className="font-medium text-slate-100">Processing</span>
                    <span className="text-slate-300 text-sm ml-2">- Contact support for cancellation</span>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-slate-600 border border-slate-500 rounded-lg">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
                  <div>
                    <span className="font-medium text-slate-100">Shipped</span>
                    <span className="text-slate-300 text-sm ml-2">- Cannot cancel, use return policy</span>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-slate-600 border border-slate-500 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <div>
                    <span className="font-medium text-slate-100">Delivered</span>
                    <span className="text-slate-300 text-sm ml-2">- Use return/refund policy</span>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Cancel */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">How to Cancel Your Order</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-1">Check Order Status</h3>
                    <p className="text-slate-300 text-sm">
                      Log into your account or check your email for the current order status. Only orders that haven't shipped can be cancelled.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-1">Contact Customer Support</h3>
                    <p className="text-slate-300 text-sm">
                      Call us at +91 98311100889 or email tufolindia@gmail.com with your order number and cancellation request.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-1">Receive Confirmation</h3>
                    <p className="text-slate-300 text-sm">
                      We'll confirm your cancellation and provide details about any refunds or charges within 24 hours.
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
                      If eligible, your refund will be processed within 3-5 business days to your original payment method.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cancellation Fees */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Cancellation Fees</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-slate-500 rounded-lg">
                  <thead>
                    <tr className="bg-slate-600">
                      <th className="border border-slate-500 p-3 text-left text-slate-100">Order Status</th>
                      <th className="border border-slate-500 p-3 text-left text-slate-100">Cancellation Fee</th>
                      <th className="border border-slate-500 p-3 text-left text-slate-100">Refund Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-500 p-3 text-slate-300">Order Placed</td>
                      <td className="border border-slate-500 p-3 text-green-400">₹0 (Free)</td>
                      <td className="border border-slate-500 p-3 text-slate-300">100% of order value</td>
                    </tr>
                    <tr className="bg-slate-600/50">
                      <td className="border border-slate-500 p-3 text-slate-300">Processing</td>
                      <td className="border border-slate-500 p-3 text-yellow-400">₹50 or 5% (whichever is lower)</td>
                      <td className="border border-slate-500 p-3 text-slate-300">Order value minus fees</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-500 p-3 text-slate-300">Shipped</td>
                      <td className="border border-slate-500 p-3 text-red-400">Not applicable</td>
                      <td className="border border-slate-500 p-3 text-slate-300">Use return policy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Special Cases */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Special Cancellation Cases</h2>
              <div className="space-y-4">
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Customized/Personalized Items</h3>
                  <p className="text-slate-300 text-sm">
                    Orders for customized or personalized items cannot be cancelled once production has started. 
                    These items are made specifically for you and cannot be resold.
                  </p>
                </div>
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Bulk Orders</h3>
                  <p className="text-slate-300 text-sm">
                    Orders with 10+ items may have different cancellation terms. Please contact our support team 
                    for assistance with bulk order cancellations.
                  </p>
                </div>
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Sale/Clearance Items</h3>
                  <p className="text-slate-300 text-sm">
                    Items purchased during sales or clearance events may have restricted cancellation policies. 
                    Check the specific terms mentioned during the sale.
                  </p>
                </div>
              </div>
            </section>

            {/* Refund Timeline */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Refund Timeline</h2>
              <p className="text-slate-300 mb-4">
                Once your cancellation is approved, refunds are processed according to the following timeline:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Credit/Debit Cards</h3>
                  <p className="text-slate-300 text-sm">5-7 business days</p>
                </div>
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Digital Wallets</h3>
                  <p className="text-slate-300 text-sm">1-3 business days</p>
                </div>
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Net Banking</h3>
                  <p className="text-slate-300 text-sm">3-5 business days</p>
                </div>
                <div className="bg-slate-600 border border-slate-500 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">UPI</h3>
                  <p className="text-slate-300 text-sm">1-2 business days</p>
                </div>
              </div>
            </section>

            {/* Important Notes */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Important Notes</h2>
              <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-300 font-medium">Please Note</p>
                    <ul className="text-yellow-200 text-sm mt-2 space-y-1">
                      <li>• Cancellation requests must include your order number</li>
                      <li>• We cannot cancel orders that have already been shipped</li>
                      <li>• Refunds are processed to the original payment method only</li>
                      <li>• Bank processing times may vary and are beyond our control</li>
                      <li>• Partial cancellations are available for multi-item orders</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Contact Us for Cancellations</h2>
              <p className="text-slate-300 mb-4">
                Need to cancel your order? Contact our customer support team:
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
                    <p className="text-slate-200 font-medium mb-2">Business Address</p>
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
                We may update this Cancellation Policy from time to time. Any changes will be posted on this page with an updated revision date.
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

export default CancellationPolicyPage;