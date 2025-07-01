'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Heart, Shield, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/dashboard" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          About
        </h1>
      </header>

      {/* App Logo and Version */}
      <div className="bg-white p-8 text-center">
        <div className="w-24 h-24 bg-[rgb(var(--scla-primary-blue))] rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white font-bold text-3xl">SCLA</span>
        </div>
        <h2 className="text-2xl font-bold text-[rgb(var(--scla-dark-navy))] mb-2">
          SKIIN Connected Life App
        </h2>
        <p className="text-[rgb(var(--scla-text-gray))]">Version 2.1.0</p>
      </div>

      {/* Mission Statement */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-3">
            Our Mission
          </h3>
          <p className="text-[rgb(var(--scla-text-gray))] leading-relaxed">
            To empower individuals with advanced health monitoring technology, 
            providing real-time insights and professional medical support for 
            better cardiac health management and improved quality of life.
          </p>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Key Features
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Heart size={20} className="text-[rgb(var(--scla-primary-blue))] mt-1 flex-shrink-0" />
              <div>
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">Real-time ECG Monitoring</p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Continuous cardiac monitoring with medical-grade accuracy
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Shield size={20} className="text-[rgb(var(--scla-primary-blue))] mt-1 flex-shrink-0" />
              <div>
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">Secure Health Data</p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  HIPAA-compliant data security and privacy protection
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Award size={20} className="text-[rgb(var(--scla-primary-blue))] mt-1 flex-shrink-0" />
              <div>
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">FDA Cleared</p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Medical device cleared for professional healthcare use
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Users size={20} className="text-[rgb(var(--scla-primary-blue))] mt-1 flex-shrink-0" />
              <div>
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">Professional Support</p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Direct connection to healthcare providers and clinics
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-3">
            SKIIN Technologies Inc.
          </h3>
          <div className="space-y-2 text-[rgb(var(--scla-text-gray))]">
            <p>© 2024 SKIIN Technologies Inc.</p>
            <p>All rights reserved.</p>
            <p className="pt-2">
              <a href="https://www.skiinapp.com" className="text-[rgb(var(--scla-primary-blue))]">
                www.skiinapp.com
              </a>
            </p>
            <p>
              <a href="mailto:support@skiinapp.com" className="text-[rgb(var(--scla-primary-blue))]">
                support@skiinapp.com
              </a>
            </p>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-6 space-y-3">
          <Link 
            href="/settings/privacy-policy"
            className="block text-center text-[rgb(var(--scla-primary-blue))] font-medium"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/settings/terms-of-service"
            className="block text-center text-[rgb(var(--scla-primary-blue))] font-medium"
          >
            Terms of Service
          </Link>
          <Link 
            href="/settings/licenses"
            className="block text-center text-[rgb(var(--scla-primary-blue))] font-medium"
          >
            Open Source Licenses
          </Link>
        </div>
      </div>
    </div>
  );
}