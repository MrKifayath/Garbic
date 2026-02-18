'use client';

import React, { useState } from 'react';
import { ShippingForm } from '@/components/checkout/shipping-form';
import { PaymentForm } from '@/components/checkout/payment-form';
import { ReviewForm } from '@/components/checkout/review-form';
import { Address, PaymentMethod } from '@/lib/types';

interface CheckoutFormProps {
  currentStep: 'shipping' | 'payment' | 'review';
  onStepChange: (step: 'shipping' | 'payment' | 'review') => void;
}

export interface CheckoutData {
  shippingAddress: Address | null;
  billingAddress: Address | null;
  paymentMethod: PaymentMethod | null;
  sameAsShipping: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  currentStep,
  onStepChange,
}) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    shippingAddress: null,
    billingAddress: null,
    paymentMethod: null,
    sameAsShipping: true,
  });

  const updateCheckoutData = (updates: Partial<CheckoutData>) => {
    setCheckoutData(prev => ({ ...prev, ...updates }));
  };

  const handleShippingComplete = (shippingAddress: Address, sameAsShipping: boolean) => {
    updateCheckoutData({
      shippingAddress,
      sameAsShipping,
      billingAddress: sameAsShipping ? shippingAddress : null,
    });
    onStepChange('payment');
  };

  const handlePaymentComplete = (paymentMethod: PaymentMethod, billingAddress?: Address) => {
    updateCheckoutData({
      paymentMethod,
      billingAddress: billingAddress || checkoutData.billingAddress,
    });
    onStepChange('review');
  };

  const handleBackToShipping = () => {
    onStepChange('shipping');
  };

  const handleBackToPayment = () => {
    onStepChange('payment');
  };

  return (
    <div>
      {currentStep === 'shipping' && (
        <ShippingForm
          initialData={checkoutData.shippingAddress}
          initialSameAsShipping={checkoutData.sameAsShipping}
          onComplete={handleShippingComplete}
        />
      )}

      {currentStep === 'payment' && (
        <PaymentForm
          shippingAddress={checkoutData.shippingAddress!}
          initialPaymentMethod={checkoutData.paymentMethod}
          initialBillingAddress={checkoutData.billingAddress}
          sameAsShipping={checkoutData.sameAsShipping}
          onComplete={handlePaymentComplete}
          onBack={handleBackToShipping}
        />
      )}

      {currentStep === 'review' && (
        <ReviewForm
          checkoutData={checkoutData}
          onBack={handleBackToPayment}
        />
      )}
    </div>
  );
};