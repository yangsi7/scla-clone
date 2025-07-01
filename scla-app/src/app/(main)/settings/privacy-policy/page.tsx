'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b bg-white">
        <button 
          onClick={() => router.back()}
          className="p-1 -ml-1 mr-3 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </button>
        <h1 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))]">
          Privacy Policy
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: January 27, 2025
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 mb-6">
            SCLA collects health data including ECG readings, symptoms, blood pressure measurements, 
            and other wellness information you provide. We also collect device information and usage 
            data to improve our services.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-6">
            Your health data is used to provide personalized insights, track your wellness journey, 
            and enable healthcare providers to monitor your condition. We use aggregated, 
            anonymized data for research and product improvement.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            3. Data Security
          </h2>
          <p className="text-gray-700 mb-6">
            We implement industry-standard security measures including encryption, secure data 
            transmission, and access controls to protect your personal health information.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            4. Data Sharing
          </h2>
          <p className="text-gray-700 mb-6">
            We only share your data with healthcare providers you authorize. We never sell your 
            personal health information to third parties. De-identified data may be used for 
            medical research with your consent.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            5. Your Rights
          </h2>
          <p className="text-gray-700 mb-6">
            You have the right to access, correct, export, or delete your personal data. 
            You can manage these options in your account settings or contact our support team.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            6. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have questions about this privacy policy or your data, please contact us at:
            <br />
            Email: privacy@skiinconnected.com
            <br />
            Phone: 1-800-SKIIN-00
          </p>
        </div>
      </div>
    </div>
  );
}