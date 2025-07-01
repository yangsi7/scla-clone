'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useHeader } from '@/contexts/HeaderContext';
import { X, ChevronRight, Battery, Bluetooth, RefreshCw } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SkeletonCard } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user } = useAuth();
  const { setConfig } = useHeader();
  const [showBatteryModal, setShowBatteryModal] = useState(false);
  const [signalStatus, setSignalStatus] = useState<'no_signal' | 'good' | 'poor'>('no_signal');
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Configure header
  useEffect(() => {
    setConfig({
      showMenuButton: true,
      rightActions: (
        <div className="flex items-center gap-2">
          {/* Signal status indicator */}
          <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${
            signalStatus === 'no_signal' ? 'bg-[rgb(var(--scla-error-red))]' : 'bg-[rgb(var(--scla-success-green))]'
          }`}>
            <X size={16} className="text-white" />
            <span className="text-white text-xs font-medium uppercase">
              {signalStatus === 'no_signal' ? 'NO SIGNAL' : 'GOOD SIGNAL'}
            </span>
          </div>
          <Battery size={20} className="text-green-500" />
          <button className="p-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>
      ),
    });
  }, [setConfig, signalStatus]);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    // Show battery optimization modal on first load
    const hasSeenModal = localStorage.getItem('battery-modal-seen');
    if (!hasSeenModal) {
      setShowBatteryModal(true);
    }
  }, []);

  const handleBatteryOptimization = (optimize: boolean) => {
    localStorage.setItem('battery-modal-seen', 'true');
    setShowBatteryModal(false);
    if (optimize) {
      // In real app, would trigger system settings
      console.log('Battery optimization accepted');
    }
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning!';
    if (hour < 18) return 'Good afternoon!';
    return 'Good evening!';
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="bg-background">
        <div className="flex items-center justify-between p-4 bg-white">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="p-4 space-y-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">

        {/* Greeting with refresh */}
        <div className="px-4 pt-4 flex items-center justify-between">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-semibold text-[rgb(var(--scla-dark-navy))]"
          >
            {getGreeting()}
          </motion.h1>
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RefreshCw size={20} className={`text-gray-500 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Main content */}
        <div className="p-4 space-y-4">
          {/* Device Connection Card */}
          {!deviceConnected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/device/connect" className="block mb-4">
                <div className="bg-blue-50 border border-[rgb(var(--scla-primary-blue))] rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[rgb(var(--scla-primary-blue))] rounded-full flex items-center justify-center">
                      <Bluetooth size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[rgb(var(--scla-dark-navy))]">
                        Connect Your Device
                      </h3>
                      <p className="text-sm text-[rgb(var(--scla-text-gray))]">
                        Tap to pair your SKIIN garment
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-[rgb(var(--scla-primary-blue))]" />
                </div>
              </div>
              </Link>
            </motion.div>
          )}

          {/* Garment Signal Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/ecg" className="block">
              <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all hover:scale-[1.02]">
              <h2 className="text-sm font-medium text-gray-500 uppercase mb-4">
                GARMENT SIGNAL STATUS
              </h2>
            
            <button className="w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="scla-badge-error animate-pulse">
                  <X size={16} className="mr-1" />
                  NO SIGNAL
                </div>
                <p className="text-sm text-[rgb(var(--scla-text-gray))]">
                  {deviceConnected 
                    ? 'Your garment is not currently capturing data.'
                    : 'No device connected. Connect a device to start monitoring.'}
                </p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
              </div>
            </Link>
          </motion.div>

          {/* Holter Study Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/holter-study" className="block">
              <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-gray-500 uppercase">
                  HOLTER STUDY PROGRESS
                </h2>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
              
              <p className="text-xs text-[rgb(var(--scla-text-gray))] mb-4">
                Last updated {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              
              <div className="bg-blue-50 border-l-4 border-[rgb(var(--scla-primary-blue))] p-3 mb-4">
                <h3 className="text-[rgb(var(--scla-primary-blue))] font-semibold mb-1">Welcome!</h3>
                <p className="text-sm text-[rgb(var(--scla-text-gray))]">
                  Check here for guidance and progress updates on your Holter study.
                </p>
              </div>
            
            {/* Progress bar */}
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[rgb(var(--scla-success-green))] transition-all duration-500"
                  style={{ width: '5%' }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[rgb(var(--scla-text-gray))]">
                  <span className="font-semibold text-[rgb(var(--scla-dark-navy))]">0h 0min</span> of usable ECG data collected
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[rgb(var(--scla-text-gray))]">
                  <span className="font-semibold text-[rgb(var(--scla-dark-navy))]">0h 0min</span> of total ECG data collected
                </span>
              </div>
              </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Battery Optimization Modal */}
        {showBatteryModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
              <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-4">
                Optimize Battery Operation
              </h2>
              <p className="text-[rgb(var(--scla-text-gray))] mb-6">
                Would you like to optimize the phone settings for better data collection?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleBatteryOptimization(false)}
                  className="scla-button-secondary"
                >
                  No
                </button>
                <button
                  onClick={() => handleBatteryOptimization(true)}
                  className="scla-button-primary"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}