'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Building2, CheckCircle } from 'lucide-react';

export default function ClinicalProgramPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/settings/advanced" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          Clinical Program
        </h1>
      </header>

      {/* Content */}
      <div className="p-6">
        {/* Clinic Selection Box */}
        <div className="bg-white rounded-lg px-4 py-3 flex items-center justify-between shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <Building2 size={24} className="text-[rgb(var(--scla-primary-blue))]" />
            <span className="text-[rgb(var(--scla-dark-navy))] text-lg">
              Staging Clinic
            </span>
          </div>
          <CheckCircle size={24} className="text-green-500" />
        </div>

        {/* Description */}
        <p className="text-[rgb(var(--scla-text-gray))] text-center mb-8 px-4">
          You are now a part of the Staging Clinic and your Health & Wellness data is being shared with Staging Clinic Clinical Team.
        </p>

        {/* Contact Information */}
        <div className="space-y-6 mb-8">
          <div>
            <p className="text-[rgb(var(--scla-dark-navy))]">info@pace-cardiology.com</p>
            <p className="text-[rgb(var(--scla-dark-navy))]">905 953-7917</p>
            <p className="text-[rgb(var(--scla-dark-navy))]">Main fax: 905 953-0046</p>
          </div>

          <div>
            <h3 className="text-[rgb(var(--scla-dark-navy))] font-semibold mb-2">Newmarket Office</h3>
            <p className="text-[rgb(var(--scla-text-gray))]">Partners in Advanced Cardiac Evaluation</p>
            <p className="text-[rgb(var(--scla-text-gray))]">581 Davis Drive, Suite 602</p>
            <p className="text-[rgb(var(--scla-text-gray))]">Newmarket, ON, L3Y 2P6</p>
          </div>

          <div>
            <h3 className="text-[rgb(var(--scla-dark-navy))] font-semibold mb-2">Barrie Office</h3>
            <p className="text-[rgb(var(--scla-text-gray))]">11 Lakeside Terrace, Unit 302</p>
            <p className="text-[rgb(var(--scla-text-gray))]">Barrie, ON L4M 0H9</p>
          </div>
        </div>

        {/* Unregister Button */}
        <button className="w-full py-3 px-6 border-2 border-[rgb(var(--scla-primary-blue))] text-[rgb(var(--scla-primary-blue))] rounded-full font-medium hover:bg-blue-50 transition-colors mb-6">
          Unregister
        </button>

        {/* Terms Link */}
        <p className="text-center">
          <Link href="/terms" className="text-[rgb(var(--scla-dark-navy))] underline">
            Tap here
          </Link>
          <span className="text-[rgb(var(--scla-text-gray))]"> to view the terms of service you agreed to with Staging Clinic.</span>
        </p>
      </div>
    </div>
  );
}