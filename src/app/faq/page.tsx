'use client';

import React, { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const faqData: FAQItem[] = [
    // Ordering & Payment
    {
      id: '1',
      category: 'ordering',
      question: 'How do I place an order?',
      answer: 'To place an order, browse our products, add items to your cart, and proceed to checkout. You&apos;ll need to provide shipping information and payment details to complete your purchase.'
    },
    {
      id: '2',
      category: 'ordering',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All payments are processed securely through our encrypted payment system.'
    },
    {
      id: '3',
      category: 'ordering',
      question: 'Can I modify or cancel my order?',
      answer: 'You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. After this time, orders are processed and cannot be changed.'
    },
    {
      id: '4',
      category: 'ordering',
      question: 'Do you offer bulk or wholesale pricing?',
      answer: 'Yes, we offer special pricing for bulk orders. Please contact our sales team at wholesale@shophub.com for more information about volume discounts and wholesale accounts.'
    },

    // Shipping & Delivery
    {
      id: '5',
      category: 'shipping',
      question: 'How much does shipping cost?',
      answer: 'Shipping costs vary based on your location and the size/weight of your order. We offer free standard shipping on orders over $50. Express shipping options are available for an additional fee.'
    },
    {
      id: '6',
      category: 'shipping',
      question: 'How long does delivery take?',
      answer: 'Standard shipping takes 3-7 business days, while express shipping takes 1-3 business days. International orders may take 7-14 business days depending on the destination.'
    },
    {
      id: '7',
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. Some restrictions may apply for certain products.'
    },
    {
      id: '8',
      category: 'shipping',
      question: 'How can I track my order?',
      answer: 'Once your order ships, you&apos;ll receive a tracking number via email. You can use this number to track your package on our website or the carrier&apos;s website.'
    },

    // Returns & Exchanges
    {
      id: '9',
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some items like personalized products or perishables cannot be returned.'
    },
    {
      id: '10',
      category: 'returns',
      question: 'How do I return an item?',
      answer: 'To return an item, log into your account, go to your order history, and select "Return Item." Print the prepaid return label and ship the item back to us. Refunds are processed within 5-7 business days.'
    },
    {
      id: '11',
      category: 'returns',
      question: 'Who pays for return shipping?',
      answer: 'We provide free return shipping for defective items or our errors. For other returns, a small return shipping fee may apply, which will be deducted from your refund.'
    },
    {
      id: '12',
      category: 'returns',
      question: 'Can I exchange an item instead of returning it?',
      answer: 'Yes, you can exchange items for a different size or color if available. The exchange process is similar to returns, and we\'ll ship the new item once we receive the original.'
    },

    // Account & Technical
    {
      id: '13',
      category: 'account',
      question: 'Do I need an account to shop?',
      answer: 'No, you can shop as a guest. However, creating an account allows you to track orders, save favorites, view order history, and enjoy faster checkout for future purchases.'
    },
    {
      id: '14',
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click &quot;Forgot Password&quot; on the login page and enter your email address. We&apos;ll send you a link to reset your password. If you don&apos;t receive the email, check your spam folder.'
    },
    {
      id: '15',
      category: 'account',
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard SSL encryption to protect your personal and payment information. We never share your data with third parties without your consent.'
    },
    {
      id: '16',
      category: 'account',
      question: 'Why is the website running slowly?',
      answer: 'Slow loading can be due to high traffic, your internet connection, or browser issues. Try clearing your browser cache, disabling extensions, or using a different browser.'
    },

    // Products & Inventory
    {
      id: '17',
      category: 'products',
      question: 'How do I know if an item is in stock?',
      answer: 'Product availability is shown on each product page. If an item is out of stock, you can sign up for restock notifications to be alerted when it becomes available again.'
    },
    {
      id: '18',
      category: 'products',
      question: 'Are your product images accurate?',
      answer: 'We strive to display accurate product images and descriptions. However, colors may vary slightly due to monitor settings. If you\'re not satisfied with your purchase, our return policy applies.'
    },
    {
      id: '19',
      category: 'products',
      question: 'Do you offer product warranties?',
      answer: 'Many of our products come with manufacturer warranties. Warranty information is listed on individual product pages. We also offer extended warranty options for select items.'
    },
    {
      id: '20',
      category: 'products',
      question: 'Can I get product recommendations?',
      answer: 'Yes! Our website shows related products and customer favorites. You can also contact our customer service team for personalized product recommendations based on your needs.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', count: faqData.length },
    { id: 'ordering', name: 'Ordering & Payment', count: faqData.filter(item => item.category === 'ordering').length },
    { id: 'shipping', name: 'Shipping & Delivery', count: faqData.filter(item => item.category === 'shipping').length },
    { id: 'returns', name: 'Returns & Exchanges', count: faqData.filter(item => item.category === 'returns').length },
    { id: 'account', name: 'Account & Technical', count: faqData.filter(item => item.category === 'account').length },
    { id: 'products', name: 'Products & Inventory', count: faqData.filter(item => item.category === 'products').length },
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find quick answers to common questions about shopping, shipping, returns, and more. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Filter */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Still need help?</h3>
                <a
                  href="/contact"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredFAQs.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          openItems.has(item.id) ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {openItems.has(item.id) && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h8a2 2 0 012 2v1.306z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600">Try selecting a different category or contact our support team.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Didn't find what you were looking for?</h2>
          <p className="text-gray-600 mb-6">
            Our customer support team is here to help with any questions or concerns you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="tel:1-800-SHOP-HUB"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
            >
              Call 1-800-SHOP-HUB
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;