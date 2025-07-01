'use client';

import React from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import { useHeader } from '@/contexts/HeaderContext';
import { useRouter } from 'next/navigation';

export function SharedHeader() {
  const { config, setDrawerOpen } = useHeader();
  const router = useRouter();

  // If custom header is provided, use it
  if (config.customHeader) {
    return <>{config.customHeader}</>;
  }

  // Don't render if explicitly hidden
  if (config.showMenuButton === false && config.showBackButton === false && !config.title) {
    return null;
  }

  const handleBackClick = () => {
    if (config.onBackClick) {
      config.onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <header className={`sticky top-0 bg-white z-40 px-4 py-3 ${config.className || ''}`}>
      <div className="flex items-center justify-between">
        {/* Left side - Menu or Back button */}
        <div className="w-10">
          {config.showBackButton ? (
            <button
              onClick={handleBackClick}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
            </button>
          ) : config.showMenuButton !== false ? (
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} className="text-[rgb(var(--scla-dark-navy))]" />
            </button>
          ) : null}
        </div>

        {/* Center - Title */}
        {config.title && (
          <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))]">
            {config.title}
          </h1>
        )}

        {/* Right side - Actions */}
        <div className="w-10 flex justify-end">
          {config.rightActions || <div />}
        </div>
      </div>
    </header>
  );
}