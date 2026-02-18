'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Address, PaymentMethod } from '@/lib/types';
import { CreditCard, Smartphone, Wallet, AlertCircle } from 'lucide-react';
import { 
  detectCardBrand, 
  validateCardNumber, 
  validateCVV, 
  validateExpiryDate,
  formatCardNumber as formatCardNumberUtil,
  mockStripeAPI 
} from '@/lib/payment-utils';

interface PaymentFormProps {
  shippingAddress: Address;
  initialPaymentMethod: PaymentMethod | null;
  initialBillingAddress: Address | null;
  sameAsShipping: boolean;
  onComplete: (paymentMethod: PaymentMethod, billingAddress?: Address) => void;
  onBack: () => void;
}

interface PaymentFormData {
  paymentType: 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay';
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

interface BillingFormData {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const PaymentForm: React.FC<PaymentFormProps> = ({
  shippingAddress,
  initialPaymentMethod,
  initialBillingAddress,
  sameAsShipping: initialSameAsShipping,
  onComplete,
  onBack,
}) => {
  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    paymentType: initialPaymentMethod?.type || 'credit_card',
    cardNumber: '',
    expiryMonth: initialPaymentMethod?.expiryMonth?.toString() || '',
    expiryYear: initialPaymentMethod?.expiryYear?.toString() || '',
    cvv: '',
    cardholderName: '',
  });

  const [sameAsShipping, setSameAsShipping] = useState(initialSameAsShipping);
  
  const [billingData, setBillingData] = useState<BillingFormData>({
    firstName: initialBillingAddress?.firstName || shippingAddress.firstName,
    lastName: initialBillingAddress?.lastName || shippingAddress.lastName,
    company: initialBillingAddress?.company || shippingAddress.company || '',
    address1: initialBillingAddress?.address1 || shippingAddress.address1,
    address2: initialBillingAddress?.address2 || shippingAddress.address2 || '',
    city: initialBillingAddress?.city || shippingAddress.city,
    state: initialBillingAddress?.state || shippingAddress.state,
    postalCode: initialBillingAddress?.postalCode || shippingAddress.postalCode,
    country: initialBillingAddress?.country || shippingAddress.country,
    phone: initialBillingAddress?.phone || shippingAddress.phone || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');

  const handlePaymentInputChange = (field: keyof PaymentFormData, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBillingInputChange = (field: keyof BillingFormData, value: string) => {
    setBillingData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked);
    if (checked) {
      setBillingData({
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        company: shippingAddress.company || '',
        address1: shippingAddress.address1,
        address2: shippingAddress.address2 || '',
        city: shippingAddress.city,
        state: shippingAddress.state,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
        phone: shippingAddress.phone || '',
      });
    }
  };

  const formatCardNumber = (value: string) => {
    return formatCardNumberUtil(value);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Payment validation
    if (paymentData.paymentType === 'credit_card' || paymentData.paymentType === 'debit_card') {
      const cardNumber = paymentData.cardNumber.replace(/\s/g, '');
      
      if (!cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!validateCardNumber(cardNumber)) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }

      if (!paymentData.expiryMonth) {
        newErrors.expiryMonth = 'Expiry month is required';
      }

      if (!paymentData.expiryYear) {
        newErrors.expiryYear = 'Expiry year is required';
      }

      if (paymentData.expiryMonth && paymentData.expiryYear) {
        if (!validateExpiryDate(paymentData.expiryMonth, paymentData.expiryYear)) {
          newErrors.expiryMonth = 'Card is expired';
          newErrors.expiryYear = 'Card is expired';
        }
      }

      const cardBrand = detectCardBrand(cardNumber);
      if (!paymentData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!validateCVV(paymentData.cvv, cardBrand)) {
        newErrors.cvv = cardBrand === 'amex' ? 'CVV must be 4 digits for American Express' : 'CVV must be 3 digits';
      }

      if (!paymentData.cardholderName.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      }
    }

    // Billing address validation (if different from shipping)
    if (!sameAsShipping) {
      if (!billingData.firstName.trim()) newErrors.billingFirstName = 'First name is required';
      if (!billingData.lastName.trim()) newErrors.billingLastName = 'Last name is required';
      if (!billingData.address1.trim()) newErrors.billingAddress1 = 'Address is required';
      if (!billingData.city.trim()) newErrors.billingCity = 'City is required';
      if (!billingData.state.trim()) newErrors.billingState = 'State is required';
      if (!billingData.postalCode.trim()) newErrors.billingPostalCode = 'Postal code is required';
      if (!billingData.country.trim()) newErrors.billingCountry = 'Country is required';

      if (billingData.postalCode && !/^\d{5}(-\d{4})?$/.test(billingData.postalCode)) {
        newErrors.billingPostalCode = 'Please enter a valid ZIP code';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setProcessingMessage('Processing payment...');

    try {
      let paymentMethod: PaymentMethod;
      
      if (paymentData.paymentType === 'credit_card' || paymentData.paymentType === 'debit_card') {
        // Process card payment
        const cardNumber = paymentData.cardNumber.replace(/\s/g, '');
        const cardBrand = detectCardBrand(cardNumber);
        
        paymentMethod = {
          id: `pm_${Math.random().toString(36).substr(2, 9)}`,
          type: paymentData.paymentType,
          last4: cardNumber.slice(-4),
          brand: cardBrand,
          expiryMonth: parseInt(paymentData.expiryMonth),
          expiryYear: parseInt(paymentData.expiryYear),
        };

        // Mock payment processing
        setProcessingMessage('Verifying card details...');
        const result = await mockStripeAPI.confirmPayment('pi_mock', paymentMethod);
        
        if (!result.success) {
          setErrors({ cardNumber: result.error || 'Payment failed' });
          return;
        }
      } else {
        // Process digital wallet payment
        setProcessingMessage(`Redirecting to ${paymentData.paymentType.replace('_', ' ')}...`);
        const result = await mockStripeAPI.processDigitalWallet(paymentData.paymentType, 100);
        
        if (!result.success) {
          setErrors({ paymentType: 'Payment failed. Please try again.' });
          return;
        }
        
        paymentMethod = {
          id: `pm_${Math.random().toString(36).substr(2, 9)}`,
          type: paymentData.paymentType,
        };
      }

      const billingAddress: Address | undefined = sameAsShipping ? undefined : {
        firstName: billingData.firstName.trim(),
        lastName: billingData.lastName.trim(),
        company: billingData.company.trim() || undefined,
        address1: billingData.address1.trim(),
        address2: billingData.address2.trim() || undefined,
        city: billingData.city.trim(),
        state: billingData.state.trim(),
        postalCode: billingData.postalCode.trim(),
        country: billingData.country.trim(),
        phone: billingData.phone.trim() || undefined,
      };

      onComplete(paymentMethod, billingAddress);
    } catch (error) {
      console.error('Error submitting payment form:', error);
      setErrors({ paymentType: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
      setProcessingMessage('');
    }
  };

  const paymentMethods = [
    { id: 'credit_card', name: 'Credit Card', icon: CreditCard },
    { id: 'debit_card', name: 'Debit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: Wallet },
    { id: 'apple_pay', name: 'Apple Pay', icon: Smartphone },
    { id: 'google_pay', name: 'Google Pay', icon: Smartphone },
  ];

  return (
    <div className="space-y-6">
      {/* Payment Method */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-100">Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Payment Method Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => handlePaymentInputChange('paymentType', method.id as any)}
                    className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                      paymentData.paymentType === method.id
                        ? 'border-accent-500 bg-accent-500/20 text-accent-400'
                        : 'border-slate-500 hover:border-slate-400 text-slate-200 bg-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">{method.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Card Details (for credit/debit cards) */}
            {(paymentData.paymentType === 'credit_card' || paymentData.paymentType === 'debit_card') && (
              <div className="space-y-4 pt-4 border-t border-slate-600">
                <Input
                  label="Card Number *"
                  value={paymentData.cardNumber}
                  onChange={(e) => handlePaymentInputChange('cardNumber', formatCardNumber(e.target.value))}
                  error={errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
                />

                <div className="grid grid-cols-3 gap-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-slate-200 mb-1">
                      Month *
                    </label>
                    <select
                      value={paymentData.expiryMonth}
                      onChange={(e) => handlePaymentInputChange('expiryMonth', e.target.value)}
                      className={`flex h-10 w-full rounded-md border border-slate-500 bg-slate-600 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                        errors.expiryMonth ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                    >
                      <option value="" className="bg-slate-600 text-slate-100">MM</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month.toString().padStart(2, '0')} className="bg-slate-600 text-slate-100">
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    {errors.expiryMonth && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.expiryMonth}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-slate-200 mb-1">
                      Year *
                    </label>
                    <select
                      value={paymentData.expiryYear}
                      onChange={(e) => handlePaymentInputChange('expiryYear', e.target.value)}
                      className={`flex h-10 w-full rounded-md border border-slate-500 bg-slate-600 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                        errors.expiryYear ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                    >
                      <option value="" className="bg-slate-600 text-slate-100">YYYY</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                        <option key={year} value={year.toString()} className="bg-slate-600 text-slate-100">
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.expiryYear && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.expiryYear}
                      </p>
                    )}
                  </div>

                  <Input
                    label="CVV *"
                    value={paymentData.cvv}
                    onChange={(e) => handlePaymentInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                    error={errors.cvv}
                    placeholder="123"
                    maxLength={4}
                    className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
                  />
                </div>

                <Input
                  label="Cardholder Name *"
                  value={paymentData.cardholderName}
                  onChange={(e) => handlePaymentInputChange('cardholderName', e.target.value)}
                  error={errors.cardholderName}
                  placeholder="John Doe"
                  className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
                />
              </div>
            )}

            {/* Digital Wallet Messages */}
            {(paymentData.paymentType === 'paypal' || paymentData.paymentType === 'apple_pay' || paymentData.paymentType === 'google_pay') && (
              <div className="p-4 bg-primary-600/20 border border-primary-500/30 rounded-lg">
                <p className="text-sm text-primary-300">
                  You will be redirected to {paymentData.paymentType === 'paypal' ? 'PayPal' : paymentData.paymentType === 'apple_pay' ? 'Apple Pay' : 'Google Pay'} to complete your payment.
                </p>
              </div>
            )}

            {/* Payment Errors */}
            {errors.paymentType && (
              <div className="p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                  <p className="text-sm text-red-300">{errors.paymentType}</p>
                </div>
              </div>
            )}

            {/* Processing Message */}
            {isSubmitting && processingMessage && (
              <div className="p-4 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400 mr-2"></div>
                  <p className="text-sm text-yellow-300">{processingMessage}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-100">Billing Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Same as Shipping Checkbox */}
            <div className="flex items-center">
              <input
                id="same-as-shipping"
                type="checkbox"
                checked={sameAsShipping}
                onChange={(e) => handleSameAsShippingChange(e.target.checked)}
                className="h-4 w-4 text-accent-600 focus:ring-accent-500 border-slate-500 rounded bg-slate-600"
              />
              <label htmlFor="same-as-shipping" className="ml-2 text-sm text-slate-200">
                Same as shipping address
              </label>
            </div>

            {/* Billing Address Form (if different from shipping) */}
            {!sameAsShipping && (
              <div className="space-y-4 pt-4 border-t border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name *"
                    value={billingData.firstName}
                    onChange={(e) => handleBillingInputChange('firstName', e.target.value)}
                    error={errors.billingFirstName}
                    placeholder="John"
                    className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
                  />
                  <Input
                    label="Last Name *"
                    value={billingData.lastName}
                    onChange={(e) => handleBillingInputChange('lastName', e.target.value)}
                    error={errors.billingLastName}
                    placeholder="Doe"
                    className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
                  />
                </div>

                <Input
                  label="Company (Optional)"
                  value={billingData.company}
                  onChange={(e) => handleBillingInputChange('company', e.target.value)}
                  placeholder="Company Name"
                  className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
                />

                <Input
                  label="Address Line 1 *"
                  value={billingData.address1}
                  onChange={(e) => handleBillingInputChange('address1', e.target.value)}
                  error={errors.billingAddress1}
                  placeholder="123 Main Street"
                  className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
                />

                <Input
                  label="Address Line 2 (Optional)"
                  value={billingData.address2}
                  onChange={(e) => handleBillingInputChange('address2', e.target.value)}
                  placeholder="Apartment, suite, etc."
                  className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City *"
                    value={billingData.city}
                    onChange={(e) => handleBillingInputChange('city', e.target.value)}
                    error={errors.billingCity}
                    placeholder="New York"
                    className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
                  />
                  
                  <div className="w-full">
                    <label className="block text-sm font-medium text-slate-200 mb-1">
                      State *
                    </label>
                    <select
                      value={billingData.state}
                      onChange={(e) => handleBillingInputChange('state', e.target.value)}
                      className={`flex h-10 w-full rounded-md border border-slate-500 bg-slate-600 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                        errors.billingState ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                    >
                      <option value="" className="bg-slate-600 text-slate-100">Select State</option>
                      {US_STATES.map(state => (
                        <option key={state} value={state} className="bg-slate-600 text-slate-100">{state}</option>
                      ))}
                    </select>
                    {errors.billingState && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.billingState}
                      </p>
                    )}
                  </div>

                  <Input
                    label="ZIP Code *"
                    value={billingData.postalCode}
                    onChange={(e) => handleBillingInputChange('postalCode', e.target.value)}
                    error={errors.billingPostalCode}
                    placeholder="12345"
                    className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
                  />
                </div>
              </div>
            )}
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
          Back to Shipping
        </Button>
        <Button
          onClick={handleSubmit}
          size="lg"
          loading={isSubmitting}
          className="flex-1"
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
};