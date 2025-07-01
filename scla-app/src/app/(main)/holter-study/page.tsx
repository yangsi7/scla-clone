'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, X, Menu, Battery, Bell, ChevronDown } from 'lucide-react';

export default function HolterStudyPage() {
  const router = useRouter();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white">
          <button className="p-2">
            <Menu size={24} className="text-[rgb(var(--scla-dark-navy))]" />
          </button>
          
          <div className="flex items-center gap-4">
            <Battery size={20} className="text-green-500" />
            <button className="p-2">
              <Bell size={20} className="text-[rgb(var(--scla-dark-navy))]" />
            </button>
          </div>
        </div>

        <div className="bg-white">
          {/* Page Title */}
          <div className="px-4 py-3 border-b border-border">
            <h1 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))]">
              HOLTER STUDY PROGRESS
            </h1>
            <p className="text-xs text-[rgb(var(--scla-text-gray))] mt-1">
              Last updated {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          {/* Welcome Section */}
          <div className="px-4 py-4">
            <div className="bg-blue-50 border-l-4 border-[rgb(var(--scla-primary-blue))] p-4 rounded-r">
              <h3 className="text-[rgb(var(--scla-primary-blue))] font-semibold mb-2">Welcome!</h3>
              <p className="text-sm text-[rgb(var(--scla-text-gray))]">
                Check here for guidance and progress updates on your Holter study.
              </p>
            </div>
          </div>

          {/* Today Section */}
          <div className="px-4 py-3">
            <h2 className="text-[rgb(var(--scla-primary-blue))] font-medium mb-3">TODAY</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[rgb(var(--scla-success-green))] rounded-full" />
                <span className="text-sm">
                  <span className="font-semibold">0h 0min</span> of usable ECG data collected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full" />
                <span className="text-sm">
                  <span className="font-semibold">0h 0min</span> of total ECG data collected
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[rgb(var(--scla-success-green))] transition-all duration-500"
                  style={{ width: '5%' }}
                />
              </div>
            </div>
          </div>

          {/* 14-Day Progress Section */}
          <div className="px-4 py-3 border-t border-border">
            <h2 className="text-[rgb(var(--scla-primary-blue))] font-medium mb-3">14-DAY PROGRESS</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[rgb(var(--scla-success-green))] rounded-full" />
                <span className="text-sm">
                  <span className="font-semibold">0h 0min</span> of usable ECG data collected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full" />
                <span className="text-sm">
                  <span className="font-semibold">0h 0min</span> of total ECG data collected
                </span>
              </div>
            </div>

            {/* 14-day chart placeholder */}
            <div className="mb-4 relative">
              <div className="flex justify-between items-end h-24">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="flex-1 mx-0.5">
                    <div className="bg-gray-200 h-full relative">
                      {i === 0 && (
                        <div className="bg-[rgb(var(--scla-success-green))] absolute bottom-0 left-0 right-0 h-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-[rgb(var(--scla-text-gray))] mt-2">
                <span>Day 1</span>
                <span>Day 7</span>
                <span>Day 14</span>
              </div>
            </div>

            <button 
              onClick={() => setShowGuideModal(true)}
              className="text-[rgb(var(--scla-primary-blue))] text-sm font-medium"
            >
              How to better collect ECG data
            </button>
          </div>
        </div>

        {/* Guide Modal */}
        {showGuideModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))]">
                  How to better collect health data
                </h2>
                <button onClick={() => setShowGuideModal(false)}>
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
              
              <ul className="space-y-4 text-sm text-[rgb(var(--scla-text-gray))]">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Always keep wifi/cellular data and Bluetooth on for uninterrupted collection</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Refer to the Operations and Safety Manual for instructions on how to properly wear your Skiin garment</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Ensure the Skiin Pod is paired with the Skiin Connected Life app on your smartphone</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Ensure the Skiin Pod is properly inserted into your Skiin garment's dock</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Prior to wearing your Skiin garment, apply moisturizer onto the garment's sensors for better conduction</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Recharge your Skiin Pod when it is not in use, like when you shower</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}