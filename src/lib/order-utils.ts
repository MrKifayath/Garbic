import { Order, OrderStatus, CartItem, Address, PaymentMethod } from '@/lib/types';

// Generate a unique order ID
export const generateOrderId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

// Generate a tracking number
export const generateTrackingNumber = (): string => {
  const prefix = 'TRK';
  const random = Math.random().toString(36).substr(2, 8).toUpperCase();
  return `${prefix}${random}`;
};

// Calculate estimated delivery date
export const calculateEstimatedDelivery = (shippingMethod: 'standard' | 'express' | 'overnight' = 'standard'): Date => {
  const now = new Date();
  let deliveryDays = 5; // Default standard shipping
  
  switch (shippingMethod) {
    case 'express':
      deliveryDays = 2;
      break;
    case 'overnight':
      deliveryDays = 1;
      break;
    default:
      deliveryDays = 5;
  }
  
  // Add business days (skip weekends)
  const deliveryDate = new Date(now);
  let addedDays = 0;
  
  while (addedDays < deliveryDays) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
      addedDays++;
    }
  }
  
  return deliveryDate;
};

// Create order from cart and checkout data
export const createOrder = (
  cartItems: CartItem[],
  shippingAddress: Address,
  billingAddress: Address,
  paymentMethod: PaymentMethod,
  totals: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  }
): Order => {
  const orderId = generateOrderId();
  const trackingNumber = generateTrackingNumber();
  const estimatedDelivery = calculateEstimatedDelivery();
  
  return {
    id: orderId,
    items: cartItems,
    shippingAddress,
    billingAddress,
    paymentMethod,
    status: 'confirmed',
    subtotal: totals.subtotal,
    tax: totals.tax,
    shipping: totals.shipping,
    total: totals.total,
    createdAt: new Date(),
    updatedAt: new Date(),
    trackingNumber,
    notes: `Order placed on ${new Date().toLocaleDateString()}. Estimated delivery: ${estimatedDelivery.toLocaleDateString()}`,
  };
};

// Order status progression
export const getOrderStatusSteps = (currentStatus: OrderStatus): Array<{
  status: OrderStatus;
  label: string;
  completed: boolean;
  current: boolean;
}> => {
  const allStatuses: Array<{ status: OrderStatus; label: string }> = [
    { status: 'pending', label: 'Order Placed' },
    { status: 'confirmed', label: 'Order Confirmed' },
    { status: 'processing', label: 'Processing' },
    { status: 'shipped', label: 'Shipped' },
    { status: 'delivered', label: 'Delivered' },
  ];
  
  const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
  const currentIndex = statusOrder.indexOf(currentStatus);
  
  return allStatuses.map((step, index) => ({
    ...step,
    completed: index < currentIndex,
    current: index === currentIndex,
  }));
};

// Format order status for display
export const formatOrderStatus = (status: OrderStatus): string => {
  const statusMap: Record<OrderStatus, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
  };
  
  return statusMap[status] || status;
};

// Get status color for UI
export const getOrderStatusColor = (status: OrderStatus): string => {
  const colorMap: Record<OrderStatus, string> = {
    pending: 'text-yellow-600 bg-yellow-100',
    confirmed: 'text-blue-600 bg-blue-100',
    processing: 'text-purple-600 bg-purple-100',
    shipped: 'text-indigo-600 bg-indigo-100',
    delivered: 'text-green-600 bg-green-100',
    cancelled: 'text-red-600 bg-red-100',
    refunded: 'text-gray-600 bg-gray-100',
  };
  
  return colorMap[status] || 'text-gray-600 bg-gray-100';
};

// Mock email service
export const mockEmailService = {
  sendOrderConfirmation: async (order: Order, customerEmail: string): Promise<boolean> => {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`📧 Order confirmation email sent to ${customerEmail}`);
    console.log(`Order ID: ${order.id}`);
    console.log(`Total: $${order.total.toFixed(2)}`);
    console.log(`Tracking: ${order.trackingNumber}`);
    
    // Mock success (in real app, this would call an email service)
    return Math.random() > 0.1; // 90% success rate
  },
  
  sendShippingNotification: async (order: Order, customerEmail: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`📦 Shipping notification sent to ${customerEmail}`);
    console.log(`Order ID: ${order.id}`);
    console.log(`Tracking: ${order.trackingNumber}`);
    
    return Math.random() > 0.05; // 95% success rate
  },
  
  sendDeliveryConfirmation: async (order: Order, customerEmail: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log(`✅ Delivery confirmation sent to ${customerEmail}`);
    console.log(`Order ID: ${order.id}`);
    
    return Math.random() > 0.02; // 98% success rate
  },
};

// Order validation
export const validateOrder = (order: Partial<Order>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!order.items || order.items.length === 0) {
    errors.push('Order must contain at least one item');
  }
  
  if (!order.shippingAddress) {
    errors.push('Shipping address is required');
  }
  
  if (!order.billingAddress) {
    errors.push('Billing address is required');
  }
  
  if (!order.paymentMethod) {
    errors.push('Payment method is required');
  }
  
  if (!order.total || order.total <= 0) {
    errors.push('Order total must be greater than zero');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

// Calculate order summary
export const calculateOrderSummary = (order: Order) => {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const weight = order.items.reduce((sum, item) => sum + (item.quantity * 1), 0); // Mock weight calculation
  
  return {
    itemCount,
    weight,
    estimatedDelivery: calculateEstimatedDelivery(),
    canCancel: ['pending', 'confirmed'].includes(order.status),
    canReturn: order.status === 'delivered',
    canTrack: ['processing', 'shipped'].includes(order.status),
  };
};

// Mock order storage (in real app, this would be a database)
const orderStorage = new Map<string, Order>();

export const mockOrderService = {
  saveOrder: async (order: Order): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    orderStorage.set(order.id, order);
    return true;
  },
  
  getOrder: async (orderId: string): Promise<Order | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return orderStorage.get(orderId) || null;
  },
  
  updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const order = orderStorage.get(orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
      orderStorage.set(orderId, order);
      return true;
    }
    return false;
  },
  
  getAllOrders: async (): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return Array.from(orderStorage.values());
  },
};