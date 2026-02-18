import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RefundPage() {
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
            <h1 className="text-4xl font-bold text-foreground mb-2">Refund Policy</h1>
            <p className="text-muted-foreground">Last updated: February 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Garbic Electronics, we want you to be completely satisfied with your purchase. If for any reason you are not satisfied with your order, we offer a comprehensive refund policy designed to protect your interests while maintaining the integrity of our products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Refund Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer refunds within 30 days of purchase under the following conditions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Product is unused, unopened, and in original packaging</li>
                <li>Product has not been damaged due to customer misuse</li>
                <li>All original accessories and documentation are included</li>
                <li>Purchase receipt or order confirmation is provided</li>
                <li>Product is not part of a clearance or final sale item</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Refund Process</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To request a refund, follow these steps:
              </p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Contact our customer service team within 30 days of purchase</li>
                <li>Provide your order number and reason for return</li>
                <li>Receive return shipping instructions</li>
                <li>Ship the product back in original packaging (prepaid return label provided)</li>
                <li>Once received and verified, refund will be processed within 5-7 business days</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Refund Amount</h2>
              <p className="text-muted-foreground leading-relaxed">
                The refund amount will include the product price and applicable taxes. Shipping charges for the original order are non-refundable. If the customer chooses expedited shipping for return, the additional cost is the responsibility of the customer unless the return is due to our error or a defective product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Damaged or Defective Products</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you receive a damaged or defective product:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Report the issue within 48 hours of delivery with photos</li>
                <li>We will arrange a replacement or full refund at our discretion</li>
                <li>Return shipping will be covered by Garbic Electronics</li>
                <li>No need to wait the 30-day period for defective items</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Non-Refundable Items</h2>
              <p className="text-muted-foreground leading-relaxed">
                The following items cannot be refunded:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Items marked as final sale or clearance</li>
                <li>Used, opened, or damaged products</li>
                <li>Items without original packaging or accessories</li>
                <li>Products purchased from unauthorized resellers</li>
                <li>Customized or personalized products</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Refund Timeline</h2>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-foreground">
                <p><strong>30 days:</strong> Refund request window from purchase date</p>
                <p><strong>5-7 business days:</strong> Processing time after return receipt</p>
                <p><strong>3-5 business days:</strong> Refund appears in original payment method</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Exchange Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you received a wrong item or would like to exchange for a different model, we will provide a prepaid return label and priority processing. Exchanges are processed within 7-10 business days upon receiving the original product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Important Notes</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>All refund requests must be made in writing via email</li>
                <li>Verbal refund requests cannot be processed</li>
                <li>Once a refund is issued, it cannot be reversed</li>
                <li>Garbic Electronics reserves the right to deny refunds that do not meet policy requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For any refund-related inquiries, please reach out to our customer service team:
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-foreground">
                <p><strong>Email:</strong> support@garbic.com</p>
                <p><strong>Phone:</strong> +91 98316 65130</p>
                <p><strong>Hours:</strong> Monday to Sunday, 10:00 AM to 6:00 PM IST</p>
                <p><strong>Address:</strong> H. No. 2-1-305, Venkataramana Apartments, Vidyanagar Nallakunta Main Road, Old Nallakunta, Hyderabad, Telangana 500044</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
