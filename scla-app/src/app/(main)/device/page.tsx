'use client';

import React, { useState, useEffect } from 'react';
import { Battery, Bluetooth, ChevronRight, Info, Power, Wifi } from 'lucide-react';
import Link from 'next/link';
import { mockAPI } from '@/mock/api';
import type { Device, UserDevice } from '@/types';

export default function DevicePage() {
  const [device, setDevice] = useState<Device | null>(null);
  const [userDevice, setUserDevice] = useState<UserDevice | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');

  useEffect(() => {
    // Get paired devices
    const loadDevice = async () => {
      const user = await mockAPI.getCurrentUser();
      if (user) {
        const pairedDevices = await mockAPI.getPairedDevices(user.id);
        if (pairedDevices.length > 0) {
          setUserDevice(pairedDevices[0]);
          const deviceInfo = await mockAPI.getDeviceStatus(pairedDevices[0].deviceId);
          setDevice(deviceInfo);
          setConnectionStatus(deviceInfo.status as 'connected' | 'disconnected');
        }
      }
    };

    loadDevice();
  }, []);

  const toggleConnection = async () => {
    if (!device) return;

    if (connectionStatus === 'connected') {
      // Simulate disconnect
      setConnectionStatus('disconnected');
    } else {
      // Simulate reconnect
      setConnectionStatus('connected');
    }
  };

  if (!device || !userDevice) {
    return (
      <div className="mobile-container">
        <div className="min-h-screen bg-gray-50">
          <div className="bg-white px-4 pt-4 pb-2">
            <h1 className="text-2xl font-bold text-[rgb(var(--scla-dark-navy))]">
              Device
            </h1>
          </div>
          <div className="p-4">
            <div className="bg-white rounded-lg p-6 text-center">
              <Bluetooth size={48} className="mx-auto mb-4 text-gray-400" />
              <h2 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-2">
                No Device Connected
              </h2>
              <p className="text-sm text-[rgb(var(--scla-text-gray))] mb-6">
                Connect your SKIIN device to start monitoring your health
              </p>
              <Link href="/device/connect">
                <button className="scla-button-primary">
                  Connect Device
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={() => window.history.back()} className="p-2">
            <svg className="w-6 h-6 text-[rgb(var(--scla-dark-navy))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h1 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))]">
            Devices
          </h1>
          
          <div className="w-10" />
        </div>

        {/* Device Card */}
        <div className="p-4">
          {/* Device Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-24 bg-gray-100 rounded-lg p-2">
              {/* Device illustration */}
              <svg viewBox="0 0 80 100" className="w-full h-full">
                <rect x="10" y="10" width="60" height="80" rx="10" fill="#2C3E50" />
                <circle cx="40" cy="30" r="15" fill="#666" />
                <text x="40" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">S</text>
                <rect x="30" y="70" width="20" height="5" fill="#4CAF50" rx="2" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-1">
                My Skiin Pod
              </h2>
              <p className="text-base text-[rgb(var(--scla-text-gray))]">
                {device.serialNumber}
              </p>
              
              <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-6 bg-[rgb(var(--scla-success-green))] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-base font-medium text-[rgb(var(--scla-dark-navy))]">
                  Connected
                </span>
              </div>
            </div>
            <button className="p-2">
              <svg className="w-6 h-6 text-[rgb(var(--scla-primary-blue))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

          {/* Sync Status */}
          <div className="text-center py-6 border-t border-b border-border">
            <p className="text-base text-[rgb(var(--scla-text-gray))] mb-6">
              Last data sync at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[rgb(var(--scla-success-green))] animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <span className="text-base text-[rgb(var(--scla-dark-navy))]">
                  Data currently syncing
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Battery size={24} className="text-[rgb(var(--scla-success-green))]" />
                <span className="text-base text-[rgb(var(--scla-dark-navy))]">
                  Pod has moderate charge
                </span>
              </div>
            </div>
          </div>
          
          {/* Garment Info */}
          <div className="py-6">
            <h3 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-1">
              Garment: Chestband
            </h3>
          </div>
          
          {/* More Details */}
          <button className="w-full flex items-center justify-between py-4 border-t border-border">
            <span className="text-lg font-medium text-[rgb(var(--scla-dark-navy))]">
              More details
            </span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[rgb(var(--scla-primary-blue))] rounded-full flex items-center justify-center flex-shrink-0">
                <Info size={20} className="text-white" />
              </div>
              <p className="text-sm text-[rgb(var(--scla-primary-blue))]">
                Please remember to wash your garment at least once a week to avoid the material from stretching out too much.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}