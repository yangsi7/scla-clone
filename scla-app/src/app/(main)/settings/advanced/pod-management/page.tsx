'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronUp, ChevronDown, CheckCircle, RefreshCw, Battery, Edit, Info } from 'lucide-react';
import Image from 'next/image';

export default function PodManagementPage() {
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/settings/advanced" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          Devices
        </h1>
      </header>

      {/* Device Card */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Device Image */}
              <div className="w-20 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-4xl">📱</div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))]">
                  My Skiin Pod
                </h2>
                <p className="text-[rgb(var(--scla-text-gray))] mt-1">
                  31067601890
                </p>
                
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="text-[rgb(var(--scla-dark-navy))]">Connected</span>
                </div>
              </div>
            </div>
            
            <button className="p-2">
              <Edit size={20} className="text-[rgb(var(--scla-primary-blue))]" />
            </button>
          </div>

          {/* Sync Status */}
          <p className="text-center text-[rgb(var(--scla-text-gray))] mb-4">
            Last data sync at 11:12 AM
          </p>

          {/* Status Indicators */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <RefreshCw size={20} className="text-green-500" />
              <span className="text-[rgb(var(--scla-dark-navy))]">Data currently syncing</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Battery size={20} className="text-green-500" />
              <span className="text-[rgb(var(--scla-dark-navy))]">Pod has moderate charge</span>
            </div>
          </div>

          {/* Garment Type */}
          <div className="mb-6">
            <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
              Garment: Chestband
            </p>
          </div>

          {/* More Details */}
          <button
            onClick={() => setShowMoreDetails(!showMoreDetails)}
            className="w-full flex items-center justify-between py-3 text-[rgb(var(--scla-dark-navy))] font-medium"
          >
            <span>More details</span>
            {showMoreDetails ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </button>

          {showMoreDetails && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
              <div className="flex justify-between">
                <span className="text-[rgb(var(--scla-text-gray))]">Firmware version</span>
                <span className="text-[rgb(var(--scla-primary-blue))]">Up to date</span>
              </div>
              <p className="text-[rgb(var(--scla-text-gray))] text-sm">(18.0.9.1)</p>
              
              <div>
                <span className="text-[rgb(var(--scla-text-gray))]">Hardware version</span>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm">(20)</p>
              </div>
            </div>
          )}
        </div>

        {/* Forget Pod Button */}
        <button className="w-full mt-6 py-3 px-6 border-2 border-[rgb(var(--scla-primary-blue))] text-[rgb(var(--scla-primary-blue))] rounded-full font-medium hover:bg-blue-50 transition-colors">
          Forget Pod
        </button>

        {/* Info Message */}
        <div className="mt-8 flex gap-3">
          <Info size={20} className="text-[rgb(var(--scla-primary-blue))] mt-1 flex-shrink-0" />
          <p className="text-[rgb(var(--scla-primary-blue))] text-sm">
            Please remember to wash your garment at least once a week to avoid the material from stretching out too much.
          </p>
        </div>
      </div>
    </div>
  );
}