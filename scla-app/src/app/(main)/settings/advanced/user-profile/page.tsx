'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function UserProfileSettingsPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/settings/advanced" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          Profile Settings
        </h1>
      </header>

      {/* Profile Information */}
      <div className="p-6 space-y-6">
        {/* Email Address */}
        <div>
          <label className="text-[rgb(var(--scla-text-gray))] text-sm">
            Email Address
          </label>
          <p className="text-[rgb(var(--scla-dark-navy))] text-lg mt-1">
            {user?.email || 'simon.yang.ch@gmail.com'}
          </p>
        </div>

        {/* Full Name */}
        <div>
          <label className="text-[rgb(var(--scla-text-gray))] text-sm">
            Full Name
          </label>
          <p className="text-[rgb(var(--scla-dark-navy))] text-lg mt-1">
            {user ? `${user.firstName} ${user.lastName}` : 'Simon Yang'}
          </p>
        </div>

        {/* Password */}
        <div>
          <label className="text-[rgb(var(--scla-text-gray))] text-sm">
            Password
          </label>
          <p className="text-[rgb(var(--scla-dark-navy))] text-lg mt-1">
            **********
          </p>
        </div>
      </div>

      {/* Delete Account */}
      <div className="mt-auto px-6 py-8">
        <Link
          href="/delete-account"
          className="text-red-600 text-lg"
        >
          Delete Account
        </Link>
      </div>
    </div>
  );
}