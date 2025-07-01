'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function QRLoginPage() {
  const router = useRouter();
  const { loginWithQR } = useAuth();
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');

  const simulateScan = async () => {
    setScanning(true);
    setError('');

    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // For demo, we'll use 'valid-qr-code' as the QR data
      await loginWithQR('valid-qr-code');
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid QR code. Try scanning again.');
      setScanning(false);
    }
  };

  return (
    <div className="mobile-container">
      <div className="min-h-screen flex flex-col px-8 py-12">
        {/* Back button */}
        <Link href="/login" className="mb-8">
          <svg className="w-6 h-6 text-[rgb(var(--scla-dark-navy))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold text-[rgb(var(--scla-dark-navy))] mb-2">
          Scan QR Code
        </h1>
        <p className="text-[rgb(var(--scla-text-gray))] mb-8">
          Point your camera at the QR code to sign in
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* QR Scanner mock */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 bg-black rounded-2xl overflow-hidden">
              {/* Scanning animation */}
              {scanning ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p>Scanning...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* QR viewfinder corners */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-white rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-white rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-white rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-white rounded-br-lg" />
                  
                  {/* Center square */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-white/30" />
                  </div>
                  
                  {/* Scan line animation */}
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-scan" />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={simulateScan}
          disabled={scanning}
          className="scla-button-primary disabled:opacity-50"
        >
          {scanning ? 'Scanning...' : 'Start Scanning'}
        </button>

        {/* Alternative option */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[rgb(var(--scla-text-gray))]">
            Having trouble?{' '}
            <Link href="/login" className="text-[rgb(var(--scla-primary-blue))] font-medium">
              Use another method
            </Link>
          </p>
        </div>

        {/* Demo info */}
        <div className="mt-auto p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-[rgb(var(--scla-primary-blue))] font-medium mb-1">
            Demo Mode:
          </p>
          <p className="text-xs text-[rgb(var(--scla-text-gray))]">
            Click "Start Scanning" to simulate QR code login
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100px); }
          50% { transform: translateY(100px); }
          100% { transform: translateY(-100px); }
        }
        
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}