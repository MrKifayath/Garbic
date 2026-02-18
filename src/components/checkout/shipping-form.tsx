'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Address } from '@/lib/types';

interface ShippingFormProps {
  initialData: Address | null;
  initialSameAsShipping: boolean;
  onComplete: (shippingAddress: Address, sameAsShipping: boolean) => void;
}

interface FormData {
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

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export const ShippingForm: React.FC<ShippingFormProps> = ({
  initialData,
  initialSameAsShipping,
  onComplete,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    company: initialData?.company || '',
    address1: initialData?.address1 || '',
    address2: initialData?.address2 || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    postalCode: initialData?.postalCode || '',
    country: initialData?.country || 'IN',
    phone: initialData?.phone || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address1.trim()) newErrors.address1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'PIN code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.phone.trim()) newErrors.phone = 'Mobile number is required';

    // Format validation
    if (formData.postalCode && !/^\d{6}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Please enter a valid 6-digit PIN code';
    }

    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s\-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
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

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const shippingAddress: Address = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        company: formData.company.trim() || undefined,
        address1: formData.address1.trim(),
        address2: formData.address2.trim() || undefined,
        city: formData.city.trim(),
        state: formData.state.trim(),
        postalCode: formData.postalCode.trim(),
        country: formData.country.trim(),
        phone: formData.phone.trim() || undefined,
      };

      onComplete(shippingAddress, initialSameAsShipping);
    } catch (error) {
      console.error('Error submitting shipping form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-slate-700 border-slate-600 shadow-xl">
      <CardHeader className="bg-slate-700">
        <CardTitle className="text-slate-100">Shipping Address</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name *"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              error={errors.firstName}
              placeholder="Rajesh"
              className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
            />
            <Input
              label="Last Name *"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              error={errors.lastName}
              placeholder="Kumar"
              className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
            />
          </div>

          {/* Company */}
          <Input
            label="Company (Optional)"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            error={errors.company}
            placeholder="Company Name"
            className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
          />

          {/* Address */}
          <Input
            label="Address Line 1 *"
            value={formData.address1}
            onChange={(e) => handleInputChange('address1', e.target.value)}
            error={errors.address1}
            placeholder="House No., Building Name, Street"
            className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
          />

          <Input
            label="Address Line 2 (Optional)"
            value={formData.address2}
            onChange={(e) => handleInputChange('address2', e.target.value)}
            error={errors.address2}
            placeholder="Area, Locality, Landmark"
            className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
          />

          {/* City, State, PIN Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="City *"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              error={errors.city}
              placeholder="Mumbai"
              className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
            />
            
            <div className="w-full">
              <label className="block text-sm font-medium text-slate-200 mb-1">
                State *
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className={`flex h-10 w-full rounded-md border border-slate-500 bg-slate-600 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200 ${
                  errors.state ? 'border-red-500 focus:ring-red-500' : ''
                }`}
              >
                <option value="" className="bg-slate-600 text-slate-100">Select State</option>
                {INDIAN_STATES.map(state => (
                  <option key={state} value={state} className="bg-slate-600 text-slate-100">{state}</option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors.state}
                </p>
              )}
            </div>

            <Input
              label="PIN Code *"
              value={formData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              error={errors.postalCode}
              placeholder="400001"
              maxLength={6}
              className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
            />
          </div>

          {/* Country */}
          <div className="w-full">
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Country *
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className={`flex h-10 w-full rounded-md border border-slate-500 bg-slate-600 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200 ${
                errors.country ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            >
              <option value="IN" className="bg-slate-600 text-slate-100">India</option>
            </select>
            {errors.country && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {errors.country}
              </p>
            )}
          </div>

          {/* Phone */}
          <Input
            label="Mobile Number *"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            placeholder="9876543210"
            maxLength={10}
            helperText="10-digit mobile number for delivery updates"
            className="bg-slate-600 border-slate-500 text-slate-100 placeholder:text-slate-400 focus:ring-accent-500 focus:border-accent-500"
          />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              loading={isSubmitting}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 hover:scale-105 transition-all duration-200"
            >
              Continue to Payment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};