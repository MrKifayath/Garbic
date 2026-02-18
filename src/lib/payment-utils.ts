import { PaymentMethod } from '@/lib/types';

// Mock Stripe configuration
export const STRIPE_CONFIG = {
  publishableKey: 'pk_test_mock_key_for_development',
  apiVersion: '2023-10-16' as const,
};

// Card brand detection based on card number
export const detectCardBrand = (cardNumber: string): string => {
  const number = cardNumber.replace(/\s/g, '');
  
  // Visa
  if (/^4/.test(number)) return 'visa';
  
  // Mastercard
  if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) return 'mastercard';
  
  // American Express
  if (/^3[47]/.test(number)) return 'amex';
  
  // Discover
  if (/^6(?:011|5)/.test(number)) return 'discover';
  
  // Default
  return 'unknown';
};

// Card number validation using Luhn algorithm
export const validateCardNumber = (cardNumber: string): boolean => {
  const number = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(number)) return false;
  if (number.length < 13 || number.length > 19) return false;
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

// CVV validation based on card brand
export const validateCVV = (cvv: string, cardBrand: string): boolean => {
  if (!/^\d+$/.test(cvv)) return false;
  
  if (cardBrand === 'amex') {
    return cvv.length === 4;
  } else {
    return cvv.length === 3;
  }
};

// Expiry date validation
export const validateExpiryDate = (month: string, year: string): boolean => {
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);
  
  if (monthNum < 1 || monthNum > 12) return false;
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  if (yearNum < currentYear) return false;
  if (yearNum === currentYear && monthNum < currentMonth) return false;
  
  return true;
};

// Format card number with spaces
export const formatCardNumber = (value: string): string => {
  const number = value.replace(/\s/g, '');
  const brand = detectCardBrand(number);
  
  if (brand === 'amex') {
    // American Express: 4-6-5 format
    return number.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  } else {
    // Other cards: 4-4-4-4 format
    return number.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
};

// Mock payment processing functions
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'processing' | 'succeeded' | 'failed';
  client_secret: string;
}

export interface PaymentResult {
  success: boolean;
  paymentIntent?: PaymentIntent;
  error?: string;
}

// Mock Stripe API calls
export const mockStripeAPI = {
  // Create payment intent
  createPaymentIntent: async (amount: number, currency: string = 'usd'): Promise<PaymentIntent> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: `pi_${Math.random().toString(36).substr(2, 24)}`,
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      status: 'requires_payment_method',
      client_secret: `pi_${Math.random().toString(36).substr(2, 24)}_secret_${Math.random().toString(36).substr(2, 16)}`,
    };
  },

  // Confirm payment
  confirmPayment: async (
    paymentIntentId: string,
    paymentMethod: PaymentMethod
  ): Promise<PaymentResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock success/failure based on card number (for testing)
    const shouldFail = paymentMethod.last4 === '0002' || paymentMethod.last4 === '0341';
    
    if (shouldFail) {
      return {
        success: false,
        error: 'Your card was declined. Please try a different payment method.',
      };
    }
    
    return {
      success: true,
      paymentIntent: {
        id: paymentIntentId,
        amount: 0, // Would be set from the original intent
        currency: 'usd',
        status: 'succeeded',
        client_secret: `${paymentIntentId}_secret_confirmed`,
      },
    };
  },

  // Process digital wallet payments
  processDigitalWallet: async (
    paymentType: 'paypal' | 'apple_pay' | 'google_pay',
    amount: number
  ): Promise<PaymentResult> => {
    // Simulate redirect/popup delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock success for digital wallets
    return {
      success: true,
      paymentIntent: {
        id: `pi_${Math.random().toString(36).substr(2, 24)}`,
        amount: Math.round(amount * 100),
        currency: 'usd',
        status: 'succeeded',
        client_secret: `pi_wallet_${Math.random().toString(36).substr(2, 16)}`,
      },
    };
  },
};

// Payment method validation
export const validatePaymentMethod = (paymentMethod: Partial<PaymentMethod>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!paymentMethod.type) {
    errors.push('Payment method type is required');
  }
  
  if (paymentMethod.type === 'credit_card' || paymentMethod.type === 'debit_card') {
    if (!paymentMethod.last4) {
      errors.push('Card information is required');
    }
    
    if (!paymentMethod.expiryMonth || !paymentMethod.expiryYear) {
      errors.push('Card expiry date is required');
    } else if (!validateExpiryDate(paymentMethod.expiryMonth.toString(), paymentMethod.expiryYear.toString())) {
      errors.push('Card expiry date is invalid or expired');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

// Generate test card numbers for development
export const TEST_CARDS = {
  visa: {
    success: '4242424242424242',
    decline: '4000000000000002',
    insufficient_funds: '4000000000009995',
  },
  mastercard: {
    success: '5555555555554444',
    decline: '5000000000000009',
  },
  amex: {
    success: '378282246310005',
    decline: '371449635398431',
  },
  discover: {
    success: '6011111111111117',
    decline: '6011000000000004',
  },
};

// Format currency for display
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Calculate processing fee (mock)
export const calculateProcessingFee = (amount: number, paymentType: PaymentMethod['type']): number => {
  const baseRate = 0.029; // 2.9%
  const fixedFee = 0.30; // $0.30
  
  let rate = baseRate;
  
  // Different rates for different payment methods
  switch (paymentType) {
    case 'credit_card':
      rate = 0.029;
      break;
    case 'debit_card':
      rate = 0.025;
      break;
    case 'paypal':
      rate = 0.034;
      break;
    case 'apple_pay':
    case 'google_pay':
      rate = 0.027;
      break;
  }
  
  return Math.round((amount * rate + fixedFee) * 100) / 100;
};