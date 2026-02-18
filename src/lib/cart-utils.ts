import { Product, CartItem } from '@/lib/types';

// Cart validation utilities
export const cartValidation = {
  // Validate if product can be added to cart
  canAddToCart: (product: Product, requestedQuantity: number = 1): { valid: boolean; error?: string } => {
    if (!product.inStock) {
      return { valid: false, error: 'Product is out of stock' };
    }
    
    if (product.stockQuantity === 0) {
      return { valid: false, error: 'Product is out of stock' };
    }
    
    if (requestedQuantity <= 0) {
      return { valid: false, error: 'Quantity must be greater than 0' };
    }
    
    if (requestedQuantity > product.stockQuantity) {
      return { valid: false, error: `Only ${product.stockQuantity} items available` };
    }
    
    return { valid: true };
  },

  // Validate cart item quantity update
  validateQuantityUpdate: (
    item: CartItem, 
    newQuantity: number
  ): { valid: boolean; error?: string; adjustedQuantity?: number } => {
    if (newQuantity < 0) {
      return { valid: false, error: 'Quantity cannot be negative' };
    }
    
    if (newQuantity === 0) {
      return { valid: true, adjustedQuantity: 0 }; // Will remove item
    }
    
    if (!item.product.inStock) {
      return { valid: false, error: 'Product is no longer in stock' };
    }
    
    if (newQuantity > item.product.stockQuantity) {
      return { 
        valid: true, 
        adjustedQuantity: item.product.stockQuantity,
        error: `Quantity adjusted to available stock (${item.product.stockQuantity})`
      };
    }
    
    return { valid: true, adjustedQuantity: newQuantity };
  },

  // Check if cart has any out of stock items
  hasOutOfStockItems: (items: CartItem[]): boolean => {
    return items.some(item => !item.product.inStock || item.product.stockQuantity === 0);
  },

  // Get out of stock items
  getOutOfStockItems: (items: CartItem[]): CartItem[] => {
    return items.filter(item => !item.product.inStock || item.product.stockQuantity === 0);
  },

  // Check if any items exceed available stock
  hasStockIssues: (items: CartItem[]): boolean => {
    return items.some(item => 
      item.quantity > item.product.stockQuantity || 
      !item.product.inStock ||
      item.product.stockQuantity === 0
    );
  },

  // Get items with stock issues
  getItemsWithStockIssues: (items: CartItem[]): Array<CartItem & { issue: string }> => {
    return items
      .filter(item => 
        item.quantity > item.product.stockQuantity || 
        !item.product.inStock ||
        item.product.stockQuantity === 0
      )
      .map(item => ({
        ...item,
        issue: !item.product.inStock || item.product.stockQuantity === 0
          ? 'Out of stock'
          : `Only ${item.product.stockQuantity} available`
      }));
  }
};

// Cart calculation utilities
export const cartCalculations = {
  // Calculate item total
  getItemTotal: (item: CartItem): number => {
    return Math.round(item.product.price * item.quantity * 100) / 100;
  },

  // Calculate cart subtotal
  getSubtotal: (items: CartItem[]): number => {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return Math.round(subtotal * 100) / 100;
  },

  // Calculate tax
  getTax: (subtotal: number, taxRate: number = 0.085): number => {
    const tax = subtotal * taxRate;
    return Math.round(tax * 100) / 100;
  },

  // Calculate shipping
  getShipping: (subtotal: number, freeShippingThreshold: number = 50, standardShipping: number = 5.99): number => {
    return subtotal >= freeShippingThreshold ? 0 : standardShipping;
  },

  // Calculate total
  getTotal: (subtotal: number, tax: number, shipping: number): number => {
    const total = subtotal + tax + shipping;
    return Math.round(total * 100) / 100;
  },

  // Get savings from original prices
  getTotalSavings: (items: CartItem[]): number => {
    const savings = items.reduce((sum, item) => {
      if (item.product.originalPrice) {
        const itemSavings = (item.product.originalPrice - item.product.price) * item.quantity;
        return sum + itemSavings;
      }
      return sum;
    }, 0);
    return Math.round(savings * 100) / 100;
  },

  // Calculate how much more needed for free shipping
  getAmountForFreeShipping: (subtotal: number, freeShippingThreshold: number = 50): number => {
    if (subtotal >= freeShippingThreshold) return 0;
    return Math.round((freeShippingThreshold - subtotal) * 100) / 100;
  }
};

// Cart formatting utilities
export const cartFormatting = {
  // Format currency
  formatCurrency: (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  },

  // Format quantity with unit
  formatQuantity: (quantity: number, unit: string = 'item'): string => {
    return `${quantity} ${quantity === 1 ? unit : unit + 's'}`;
  },

  // Get cart summary text
  getCartSummary: (itemCount: number, total: number): string => {
    if (itemCount === 0) return 'Cart is empty';
    return `${cartFormatting.formatQuantity(itemCount)} • ${cartFormatting.formatCurrency(total)}`;
  }
};