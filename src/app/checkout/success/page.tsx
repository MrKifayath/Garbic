'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react';
import { mockOrderService } from '@/lib/order-utils';
import { Order } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        try {
          const orderData = await mockOrderService.getOrder(orderId);
          setOrder(orderData);
        } catch (error) {
          console.error('Error fetching order:', error);
        }
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-slate-700 border-slate-600 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
              <p className="text-slate-200">Loading order details...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-slate-700 border-slate-600 shadow-xl">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-slate-100 mb-4">Order Not Found</h1>
              <p className="text-slate-200 mb-6">We couldn't find the order you're looking for.</p>
              <Link href="/products">
                <Button className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent mb-2">
            Order Confirmed!
          </h1>
          <p className="text-xl text-slate-200">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Order Info */}
            <Card className="bg-slate-700 border-slate-600 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">Order Details</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Order Number:</span>
                    <span className="text-slate-100 font-medium">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Order Date:</span>
                    <span className="text-slate-100">{order.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Tracking Number:</span>
                    <span className="text-slate-100 font-medium">{order.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Amount:</span>
                    <span className="text-accent-500 font-semibold text-lg">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="bg-slate-700 border-slate-600 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-3 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-primary-400" />
                  Shipping Address
                </h3>
                <div className="text-sm text-slate-200">
                  <p className="font-medium text-slate-100">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  {order.shippingAddress.company && (
                    <p>{order.shippingAddress.company}</p>
                  )}
                  <p>{order.shippingAddress.address1}</p>
                  {order.shippingAddress.address2 && (
                    <p>{order.shippingAddress.address2}</p>
                  )}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-slate-700 border-slate-600 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-3">Payment Method</h3>
                <div className="text-sm text-slate-200">
                  <span className="capitalize">
                    {order.paymentMethod.type.replace('_', ' ')}
                  </span>
                  {order.paymentMethod.last4 && (
                    <span> ending in {order.paymentMethod.last4}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items & Next Steps */}
          <div className="space-y-6">
            {/* Order Items */}
            <Card className="bg-slate-700 border-slate-600 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-accent-500" />
                  Order Items ({order.items.length})
                </h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3 py-2 border-b border-slate-600 last:border-b-0">
                      <div className="flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-100 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-slate-300">
                          Qty: {item.quantity}
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

            {/* Next Steps */}
            <Card className="bg-slate-700 border-slate-600 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">What's Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-100">Order Confirmation</p>
                      <p className="text-xs text-slate-300">You'll receive an email confirmation shortly</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-300">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-100">Processing</p>
                      <p className="text-xs text-slate-300">We'll prepare your order for shipping</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-300">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-100">Shipping Updates</p>
                      <p className="text-xs text-slate-300">Track your package with tracking number: {order.trackingNumber}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-slate-700 border-slate-600 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Mail className="w-5 h-5 mr-2 text-accent-500" />
                  <h3 className="text-lg font-semibold text-slate-100">Need Help?</h3>
                </div>
                <p className="text-sm text-slate-200 mb-4">
                  If you have any questions about your order, please don't hesitate to contact us.
                </p>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>Email: tufolindia@gmail.com</p>
                  <p>Phone: +91 98311100889</p>
                  <p>Hours: Mon-Fri 9AM-6PM IST</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 hover:scale-105 transition-all duration-200"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-slate-500 text-slate-200 hover:bg-slate-600 hover:border-slate-400"
            onClick={() => window.print()}
          >
            Print Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-slate-700 border-slate-600 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
            <p className="text-slate-200">Loading order details...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}