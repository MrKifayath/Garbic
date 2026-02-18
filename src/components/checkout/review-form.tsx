'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { CheckoutData } from './checkout-form';
import { formatPrice } from '@/lib/utils';
import { Edit, CreditCard, MapPin, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createOrder, mockOrderService, mockEmailService } from '@/lib/order-utils';
import { Address } from '@/lib/types';

interface ReviewFormProps {
  checkoutData: CheckoutData;
  onBack: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  checkoutData,
  onBack,
}) => {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    try {
      // Create order object
      const order = createOrder(
        cart.items,
        shippingAddress!, // We know it's not null due to the check above
        finalBillingAddress,
        paymentMethod!, // We know it's not null due to the check above
        {
          subtotal: cart.subtotal,
          tax: cart.tax,
          shipping: cart.shipping,
          total: cart.total,
        }
      );

      // Save order (mock)
      await mockOrderService.saveOrder(order);

      // Send confirmation email (mock)
      const emailSent = await mockEmailService.sendOrderConfirmation(order, 'customer@example.com');
      
      if (!emailSent) {
        console.warn('Failed to send confirmation email');
      }

      // Clear cart
      clearCart();

      // Redirect to success page
      router.push(`/checkout/success?orderId=${order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      setIsSubmitting(false);
    }
  };

  const { shippingAddress, billingAddress, paymentMethod, sameAsShipping } = checkoutData;

  if (!shippingAddress || !paymentMethod) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-red-600">Missing required information. Please go back and complete all steps.</p>
        </CardContent>
      </Card>
    );
  }

  // Ensure we always have a billing address (use shipping as fallback)
  const finalBillingAddress: Address = sameAsShipping ? shippingAddress : (billingAddress || shippingAddress);

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-100">
            <Package className="w-5 h-5 mr-2" />
            Order Items ({cart.items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.product.id} className="flex items-center space-x-4 py-4 border-b border-slate-600 last:border-b-0">
                <div className="flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-slate-100 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-sm text-slate-300">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-sm font-medium text-slate-100">
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-slate-100">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Shipping Address
            </div>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-300">
            <p className="font-medium text-slate-100">
              {shippingAddress.firstName} {shippingAddress.lastName}
            </p>
            {shippingAddress.company && (
              <p>{shippingAddress.company}</p>
            )}
            <p>{shippingAddress.address1}</p>
            {shippingAddress.address2 && (
              <p>{shippingAddress.address2}</p>
            )}
            <p>
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
            </p>
            <p>{shippingAddress.country}</p>
            {shippingAddress.phone && (
              <p className="mt-2">Phone: {shippingAddress.phone}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-slate-100">
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Method
            </div>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-300">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span className="capitalize">
                {paymentMethod.type.replace('_', ' ')}
              </span>
              {paymentMethod.last4 && (
                <span>ending in {paymentMethod.last4}</span>
              )}
            </div>
            {paymentMethod.expiryMonth && paymentMethod.expiryYear && (
              <p className="mt-1">
                Expires {paymentMethod.expiryMonth.toString().padStart(2, '0')}/{paymentMethod.expiryYear}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-slate-100">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Billing Address
            </div>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sameAsShipping ? (
            <p className="text-sm text-slate-300">Same as shipping address</p>
          ) : (
            <div className="text-sm text-slate-300">
              <p className="font-medium text-slate-100">
                {finalBillingAddress.firstName} {finalBillingAddress.lastName}
              </p>
              {finalBillingAddress.company && (
                <p>{finalBillingAddress.company}</p>
              )}
              <p>{finalBillingAddress.address1}</p>
              {finalBillingAddress.address2 && (
                <p>{finalBillingAddress.address2}</p>
              )}
              <p>
                {finalBillingAddress.city}, {finalBillingAddress.state} {finalBillingAddress.postalCode}
              </p>
              <p>{finalBillingAddress.country}</p>
              {finalBillingAddress.phone && (
                <p className="mt-2">Phone: {finalBillingAddress.phone}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-100">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Subtotal</span>
              <span className="text-slate-100">{formatPrice(cart.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Shipping</span>
              <span className="text-slate-100">{cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Tax</span>
              <span className="text-slate-100">{formatPrice(cart.tax)}</span>
            </div>
            <div className="border-t border-slate-600 pt-2 flex justify-between font-semibold text-lg">
              <span className="text-slate-100">Total</span>
              <span className="text-accent-500">{formatPrice(cart.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 h-4 w-4 text-accent-600 focus:ring-accent-500 border-slate-500 rounded bg-slate-600"
              required
            />
            <label htmlFor="terms" className="text-sm text-slate-200">
              I agree to the{' '}
              <a href="/terms" className="text-accent-400 hover:underline" target="_blank">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-accent-400 hover:underline" target="_blank">
                Privacy Policy
              </a>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="sm:w-auto"
        >
          Back to Payment
        </Button>
        <Button
          onClick={handlePlaceOrder}
          size="lg"
          loading={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Processing Order...' : `Place Order - ${formatPrice(cart.total)}`}
        </Button>
      </div>
    </div>
  );
};