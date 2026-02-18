'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto">
              We're here to help! Reach out to our team for any questions, concerns, or feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-700 rounded-2xl shadow-xl p-8 border border-slate-600 hover:shadow-2xl transition-all duration-300 animate-slide-in-left">
                <h2 className="text-2xl font-bold text-slate-100 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-100">Email</h3>
                      <p className="text-primary-400 font-medium">tufolindia@gmail.com</p>
                      <p className="text-sm text-slate-300 mt-1">Response within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-100">Phone</h3>
                      <p className="text-green-400 font-medium">+91 98311100889</p>
                      <p className="text-sm text-slate-300 mt-1">Mon-Sat 10AM-7PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-100">Address</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        4-38-17/B, DEENABANDU COLONY<br />
                        Jagathgiri Gutta, Hyderabad<br />
                        Telangana, 500037, India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-600">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">Business Hours</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-600 transition-colors">
                      <span className="text-slate-300 font-medium">Monday - Saturday</span>
                      <span className="text-slate-100 font-semibold">10:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-600 transition-colors">
                      <span className="text-slate-300 font-medium">Sunday</span>
                      <span className="text-slate-100 font-semibold">10:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-700 rounded-2xl shadow-xl p-8 border border-slate-600 animate-slide-in-right">
                <h2 className="text-2xl font-bold text-slate-100 mb-6">Send us a Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg animate-fade-in-up">
                    <div className="flex">
                      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          Thank you! We'll get back to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="animate-fade-in-up animation-delay-200">
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-200 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all bg-slate-600 text-slate-100 placeholder:text-slate-400"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="animate-fade-in-up animation-delay-400">
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all bg-slate-600 text-slate-100 placeholder:text-slate-400"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="animate-fade-in-up animation-delay-600">
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-200 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all bg-slate-600 text-slate-100"
                    >
                      <option value="">Select a subject</option>
                      <option value="order-inquiry">Order Inquiry</option>
                      <option value="product-question">Product Question</option>
                      <option value="shipping-returns">Shipping & Returns</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="animate-fade-in-up animation-delay-800">
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-200 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all resize-none bg-slate-600 text-slate-100 placeholder:text-slate-400"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <div className="animate-bounce-in animation-delay-1000">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-xl hover:from-primary-500 hover:to-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="mt-16 bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl p-8 text-center border border-slate-600 animate-fade-in-up shadow-xl">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Looking for Quick Answers?</h2>
            <p className="text-slate-200 mb-6 text-lg">
              Check out our FAQ section for immediate help with common inquiries.
            </p>
            <a
              href="/faq"
              className="inline-flex items-center px-6 py-3 border-2 border-accent-500 text-base font-semibold rounded-xl text-accent-400 bg-slate-800 hover:bg-accent-500 hover:text-white transition-all transform hover:scale-105 shadow-lg"
            >
              Visit FAQ Page
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;