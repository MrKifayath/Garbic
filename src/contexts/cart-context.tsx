'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem, Cart } from '@/lib/types';
import { cartValidation } from '@/lib/cart-utils';

// Cart action types
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

// Cart context type
interface CartContextType {
  cart: Cart;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getItemQuantity: (productId: string) => number;
  hasStockIssues: () => boolean;
  getStockIssues: () => Array<CartItem & { issue: string }>;
  isItemInCart: (productId: string) => boolean;
}

// Initial cart state
const initialCart: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
};

// Tax rate (8.5%)
const TAX_RATE = 0.085;
// Free shipping threshold
const FREE_SHIPPING_THRESHOLD = 50;
// Standard shipping cost
const STANDARD_SHIPPING = 5.99;

// Calculate cart totals
const calculateTotals = (items: CartItem[]): Omit<Cart, 'items'> => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const total = subtotal + tax + shipping;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
};

// Cart reducer
const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stockQuantity) }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, { 
          product, 
          quantity: Math.min(quantity, product.stockQuantity) 
        }];
      }
      
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload.productId);
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const newItems = state.items.filter(item => item.product.id !== productId);
        const totals = calculateTotals(newItems);
        return { items: newItems, ...totals };
      }
      
      const newItems = state.items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: Math.min(quantity, item.product.stockQuantity) }
          : item
      );
      
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }
    
    case 'CLEAR_CART': {
      return initialCart;
    }
    
    case 'LOAD_CART': {
      return action.payload;
    }
    
    default:
      return state;
  }
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
  }, [cart]);

  // Cart actions
  const addItem = (product: Product, quantity: number = 1) => {
    const validation = cartValidation.canAddToCart(product, quantity);
    
    if (!validation.valid) {
      console.warn('Cannot add item to cart:', validation.error);
      throw new Error(validation.error);
    }
    
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const item = cart.items.find(item => item.product.id === productId);
    
    if (item) {
      const validation = cartValidation.validateQuantityUpdate(item, quantity);
      
      if (!validation.valid && validation.error) {
        console.warn('Quantity update validation failed:', validation.error);
        // Still proceed with the update but log the warning
      }
      
      // Use adjusted quantity if provided, otherwise use the requested quantity
      const finalQuantity = validation.adjustedQuantity !== undefined 
        ? validation.adjustedQuantity 
        : quantity;
        
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity: finalQuantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemCount = (): number => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getItemQuantity = (productId: string): number => {
    const item = cart.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const hasStockIssues = (): boolean => {
    return cartValidation.hasStockIssues(cart.items);
  };

  const getStockIssues = () => {
    return cartValidation.getItemsWithStockIssues(cart.items);
  };

  const isItemInCart = (productId: string): boolean => {
    return cart.items.some(item => item.product.id === productId);
  };

  const value: CartContextType = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getItemQuantity,
    hasStockIssues,
    getStockIssues,
    isItemInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};