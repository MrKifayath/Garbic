import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CancellationPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="bg-card border border-border rounded-xl p-8 animate-fadeInUp space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Cancellation Policy</h1>
            <p className="text-muted-foreground">Last updated: February 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Order Cancellation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Garbic Electronics allows order cancellations within a specific timeframe to ensure customer satisfaction and maintain our operational efficiency. Please review the following policy carefully.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Cancellation Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You can cancel your order under the following conditions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Order has not been dispatched from our warehouse</li>
                <li>Cancellation request is made within 24 hours of order placement</li>
                <li>The order is in &quot;Processing&quot; or &quot;Pending&quot; status</li>
                <li>Item is not in &quot;Shipped&quot; or &quot;Out for Delivery&quot; status</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">How to Cancel an Order</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To cancel your order, follow these steps:
              </p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Log in to your Garbic Electronics account</li>
                <li>Navigate to &quot;My Orders&quot; section</li>
                <li>Select the order you wish to cancel</li>
                <li>Click on &quot;Cancel Order&quot; button (if available)</li>
                <li>Provide a reason for cancellation</li>
                <li>Confirm the cancellation</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Cancellation via Customer Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you cannot cancel through your account, you can request cancellation by contacting our customer service team. Please provide your order number and request cancellation within the eligible timeframe. Cancellation requests must be made in writing via email or phone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Refund for Cancelled Orders</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When an order is cancelled successfully:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Full refund including product price and applicable taxes will be issued</li>
                <li>Shipping charges for the original order are non-refundable</li>
                <li>Refund will be processed to the original payment method</li>
                <li>Refund typically appears within 3-5 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Non-Cancellable Orders</h2>
              <p className="text-muted-foreground leading-relaxed">
                The following orders cannot be cancelled:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Orders that have already been dispatched/shipped</li>
                <li>Orders in &quot;Out for Delivery&quot; status</li>
                <li>Orders that have been delivered</li>
                <li>Orders cancelled after the 24-hour window</li>
                <li>Orders marked as pre-orders or special orders</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Return After Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                If your order has already been shipped or delivered, you will not be able to cancel it through the cancellation policy. Instead, you can proceed with a return under our Refund Policy. Please refer to our Refund Policy page for more information on returning delivered products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Order Status</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Order statuses are as follows:
              </p>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex justify-between items-start bg-muted p-3 rounded">
                  <span className="font-semibold text-foreground">Pending</span>
                  <span>Order received, awaiting processing</span>
                </div>
                <div className="flex justify-between items-start bg-muted p-3 rounded">
                  <span className="font-semibold text-foreground">Processing</span>
                  <span>Order is being prepared for shipment</span>
                </div>
                <div className="flex justify-between items-start bg-muted p-3 rounded">
                  <span className="font-semibold text-foreground">Dispatched</span>
                  <span>Order has left our warehouse</span>
                </div>
                <div className="flex justify-between items-start bg-muted p-3 rounded">
                  <span className="font-semibold text-foreground">Out for Delivery</span>
                  <span>Order is with the delivery partner</span>
                </div>
                <div className="flex justify-between items-start bg-muted p-3 rounded">
                  <span className="font-semibold text-foreground">Delivered</span>
                  <span>Order has been delivered</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Partial Cancellation</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have ordered multiple items and wish to cancel only some of them, please contact our customer service team. Partial cancellations are subject to the same eligibility criteria as full cancellations. Refunds for partial cancellations will be processed based on the individual item prices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Important Notes</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Cancellation requests should be submitted as soon as possible</li>
                <li>Once a cancellation is confirmed, it cannot be reversed</li>
                <li>Garbic Electronics reserves the right to refuse cancellations that violate this policy</li>
                <li>In case of disputes, Garbic Electronics decision is final</li>
                <li>This policy applies to all orders placed on the Garbic Electronics website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For cancellation requests or inquiries, please contact us:
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-foreground">
                <p><strong>Email:</strong> support@garbic.com</p>
                <p><strong>Phone:</strong> +91 98316 65130</p>
                <p><strong>Hours:</strong> Monday to Sunday, 10:00 AM to 6:00 PM IST</p>
                <p><strong>Address:</strong> H. No. 2-1-305, Venkataramana Apartments, Vidyanagar Nallakunta Main Road, Old Nallakunta, Hyderabad, Telangana 500044</p>
                <p><strong>GSTIN:</strong> 36AAMCG6094P1ZO</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
