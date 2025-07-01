'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function UserSettingsPage() {
  const { user } = useAuth();

  const settingsItems = [
    { label: 'Devices', href: '/device' },
    { label: 'View Clinic', href: '/clinic' },
    { label: 'Language', href: '/settings/language' },
    { label: 'About', href: '/about' },
    { label: 'Help', href: '/help' },
    { label: 'Advanced Settings', href: '/settings/advanced' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center">
        <Link href="/dashboard" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          User Settings
        </h1>
      </header>

      {/* Profile Information Card */}
      <div className="m-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-[rgb(var(--scla-dark-navy))] font-medium mb-6 uppercase text-sm tracking-wide">
            PROFILE INFORMATION
          </h2>
          
          <div className="space-y-4">
            <div>
              <span className="text-[rgb(var(--scla-dark-navy))] font-medium">Name:</span>
              <span className="ml-4 text-[rgb(var(--scla-text-gray))]">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            
            <div>
              <span className="text-[rgb(var(--scla-dark-navy))] font-medium">Email:</span>
              <span className="ml-4 text-[rgb(var(--scla-text-gray))]">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Links */}
      <div className="space-y-2">
        {settingsItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-[rgb(var(--scla-dark-navy))] text-lg">
              {item.label}
            </span>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>
        ))}
      </div>

      {/* Delete Account */}
      <div className="px-6 py-4 mt-8">
        <Link
          href="/settings/delete-account"
          className="text-red-600 text-lg font-medium"
        >
          Delete Account
        </Link>
      </div>
    </div>
  );
}