import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - TUFOLDBETA SOLUTIONS',
  description: 'Learn about TUFOLDBETA SOLUTIONS PRIVATE LIMITED, your trusted online electronics destination. Discover our mission, values, and commitment to providing quality electronic products and exceptional service across India.',
};

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About TUFOLDBETA SOLUTIONS</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted online shopping destination for goods, services, and products of all kinds 
            including electronics, apparel, accessories, home goods, and personal items across India.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              At TUFOLDBETA SOLUTIONS PRIVATE LIMITED, we carry on the business of e-commerce 
              and operate, manage and run an online portal or website for selling and buying 
              goods, services, and products of all kinds including but not limited to electronics, 
              apparel, accessories, home goods, and personal items.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Our business operates through our proprietary website and digital channels, involving 
              procurement, storage, marketing, and delivery of diverse products to customers across India. 
              We strive to make quality products from all categories accessible to everyone.
            </p>
            <p className="text-lg text-gray-700">
              We are committed to providing competitive prices, reliable delivery, and outstanding 
              customer service that builds lasting relationships with our customers nationwide.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Products</h3>
              <p className="text-gray-600">
                We carefully curate our diverse product selection to ensure every item meets our high 
                standards for quality, performance, and value across all categories.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">India-Wide Delivery</h3>
              <p className="text-gray-600">
                Quick processing, secure packaging, and reliable shipping partners ensure your 
                orders arrive safely across India, regardless of product category.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Focused</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We provide responsive support and stand 
                behind every purchase with our satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                TUFOLDBETA SOLUTIONS PRIVATE LIMITED was founded with a vision to revolutionize the e-commerce 
                landscape in India. Based in Hyderabad, Telangana, we recognized the growing demand for a 
                comprehensive online platform that offers products of all kinds and serves customers nationwide.
              </p>
              <p className="mb-4">
                Our journey has been driven by continuous innovation in e-commerce technology 
                and an unwavering commitment to customer satisfaction. We've built strong 
                partnerships with suppliers across multiple categories to bring you diverse 
                products at competitive prices.
              </p>
              <p className="mb-4">
                From electronics and apparel to accessories, home goods, and personal items, 
                we've expanded our offerings while maintaining our focus on quality and 
                service excellence across all product categories.
              </p>
              <p>
                Today, TUFOLDBETA SOLUTIONS continues to grow, embracing new technologies and expanding 
                our product range across India while maintaining the personal touch and attention to 
                detail that our customers have come to expect.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Johnson</h3>
              <p className="text-blue-600 font-medium mb-3">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                With over 15 years in e-commerce, Sarah leads our vision of creating 
                exceptional online shopping experiences.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Michael Chen</h3>
              <p className="text-blue-600 font-medium mb-3">CTO</p>
              <p className="text-gray-600 text-sm">
                Michael oversees our technology infrastructure, ensuring our platform 
                remains secure, fast, and user-friendly.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emily Rodriguez</h3>
              <p className="text-blue-600 font-medium mb-3">Head of Customer Experience</p>
              <p className="text-gray-600 text-sm">
                Emily ensures every customer interaction exceeds expectations, leading 
                our support and satisfaction initiatives.
              </p>
            </div>
          </div>
        </div> */}

        {/* Contact CTA */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions about TUFOLDBETA SOLUTIONS or want to learn more about our products and services? 
            We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">98311100889</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>tufolindia@gmail.com</span>
            </div>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;