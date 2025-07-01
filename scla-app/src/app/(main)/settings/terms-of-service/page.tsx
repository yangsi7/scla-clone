'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TermsOfServicePage() {
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
          Terms of Service
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-600 mb-6">
            Effective Date: January 27, 2025
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 mb-6">
            By using the SCLA app and SKIIN devices, you agree to these Terms of Service. 
            If you do not agree, please do not use our services.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            2. Medical Disclaimer
          </h2>
          <p className="text-gray-700 mb-6">
            SCLA and SKIIN devices are not intended to diagnose, treat, cure, or prevent any disease. 
            Always consult with a qualified healthcare provider for medical advice. Do not make 
            medical decisions based solely on data from our devices.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            3. User Responsibilities
          </h2>
          <p className="text-gray-700 mb-6">
            You are responsible for:
            • Providing accurate information
            • Maintaining the security of your account
            • Using the devices as instructed
            • Keeping your app and device firmware updated
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            4. Service Availability
          </h2>
          <p className="text-gray-700 mb-6">
            We strive to maintain continuous service but cannot guarantee uninterrupted access. 
            Services may be temporarily unavailable for maintenance or updates.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            5. Intellectual Property
          </h2>
          <p className="text-gray-700 mb-6">
            All content, features, and functionality are owned by SKIIN Technologies and are 
            protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-6">
            SKIIN Technologies shall not be liable for any indirect, incidental, special, 
            consequential, or punitive damages resulting from your use of the service.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            7. Changes to Terms
          </h2>
          <p className="text-gray-700 mb-6">
            We may update these terms from time to time. We will notify you of any material 
            changes through the app or via email.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-3">
            8. Contact Information
          </h2>
          <p className="text-gray-700">
            For questions about these Terms of Service:
            <br />
            Email: legal@skiinconnected.com
            <br />
            Phone: 1-800-SKIIN-00
          </p>
        </div>
      </div>
    </div>
  );
}