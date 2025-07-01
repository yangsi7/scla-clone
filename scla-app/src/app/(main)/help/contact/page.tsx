'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export default function ContactUsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  const subjects = [
    'Technical Support',
    'Device Issues',
    'App Functionality',
    'Account Problems',
    'Billing Questions',
    'Feature Request',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.message) {
      showToast('error', 'Please fill in all fields');
      return;
    }

    // Simulate sending message
    showToast('success', 'Your message has been sent. We\'ll respond within 24 hours.');

    // Reset form and navigate back
    setTimeout(() => {
      router.push('/help');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/help" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          Contact Us
        </h1>
      </header>

      {/* Contact Form */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-[rgb(var(--scla-text-gray))] mb-6">
            Send us a message and we'll get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject */}
            <div>
              <label className="block text-[rgb(var(--scla-dark-navy))] font-medium mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--scla-primary-blue))] focus:border-transparent"
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[rgb(var(--scla-dark-navy))] font-medium mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe your issue or question in detail..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--scla-primary-blue))] focus:border-transparent resize-none"
              />
              <p className="text-sm text-[rgb(var(--scla-text-gray))] mt-1">
                {formData.message.length}/500 characters
              </p>
            </div>

            {/* Device Information Note */}
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-[rgb(var(--scla-dark-navy))]">
                <strong>Note:</strong> Your device information and app version will be automatically 
                included with your message to help us assist you better.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[rgb(var(--scla-primary-blue))] text-white rounded-full py-3 px-6 font-medium hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Alternative Contact Methods */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Other Ways to Reach Us
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-[rgb(var(--scla-dark-navy))] font-medium">Email</p>
              <a href="mailto:support@skiinapp.com" className="text-[rgb(var(--scla-primary-blue))]">
                support@skiinapp.com
              </a>
            </div>
            <div>
              <p className="text-[rgb(var(--scla-dark-navy))] font-medium">Phone</p>
              <a href="tel:+18005555555" className="text-[rgb(var(--scla-primary-blue))]">
                1-800-555-5555
              </a>
              <p className="text-sm text-[rgb(var(--scla-text-gray))] mt-1">
                Mon-Fri: 9AM-6PM EST
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}