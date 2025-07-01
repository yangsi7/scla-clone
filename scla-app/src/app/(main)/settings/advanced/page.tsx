'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function AdvancedSettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  
  const settingsItems = [
    {
      label: 'User Profile Settings',
      href: '/settings/advanced/user-profile',
    },
    {
      label: 'Clinical Program',
      href: '/settings/advanced/clinical-program',
    },
    {
      label: 'Pod Management',
      href: '/settings/advanced/pod-management',
    },
    {
      label: 'Health & Wellness Data Upload',
      href: '/settings/advanced/data-upload',
      subtitle: 'Both wifi and cellular data',
      hasDropdown: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/settings/profile" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          Advanced Settings
        </h1>
      </header>

      {/* Settings List */}
      <div className="bg-white mt-2">
        {settingsItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors border-b border-gray-200"
          >
            <div className="flex-1">
              <p className="text-[rgb(var(--scla-dark-navy))] text-lg">
                {item.label}
              </p>
              {item.subtitle && (
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  {item.subtitle}
                </p>
              )}
            </div>
            {item.hasDropdown ? (
              <ChevronDown size={20} className="text-gray-400" />
            ) : (
              <ChevronRight size={20} className="text-gray-400" />
            )}
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button 
          onClick={async () => {
            await logout();
            router.push('/welcome');
          }}
          className="w-full text-left px-6 py-5 text-red-600 text-lg hover:bg-gray-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}