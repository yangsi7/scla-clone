'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function SixDigitLoginPage() {
  const router = useRouter();
  const { loginWithSixDigit } = useAuth();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are filled
    if (newDigits.every(d => d) && index === 5) {
      handleSubmit(newDigits.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (code?: string) => {
    const finalCode = code || digits.join('');
    if (finalCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await loginWithSixDigit(finalCode);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid code. Any 6 digits will work for demo.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newDigits = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
      setDigits(newDigits);
      if (pastedData.length === 6) {
        handleSubmit(pastedData);
      }
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
          Enter 6-Digit Code
        </h1>
        <p className="text-[rgb(var(--scla-text-gray))] mb-8">
          Enter the code sent to your email or phone
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* 6-digit input */}
        <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-xl font-semibold border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              maxLength={1}
              disabled={loading}
            />
          ))}
        </div>

        {/* Submit button */}
        <button
          onClick={() => handleSubmit()}
          disabled={loading || digits.some(d => !d)}
          className="scla-button-primary disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify Code'}
        </button>

        {/* Resend link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[rgb(var(--scla-text-gray))]">
            Didn't receive the code?{' '}
            <button className="text-[rgb(var(--scla-primary-blue))] font-medium">
              Resend
            </button>
          </p>
        </div>

        {/* Demo info */}
        <div className="mt-auto p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-[rgb(var(--scla-primary-blue))] font-medium mb-1">
            Demo Mode:
          </p>
          <p className="text-xs text-[rgb(var(--scla-text-gray))]">
            Any 6-digit code will work (e.g., 123456)
          </p>
        </div>
      </div>
    </div>
  );
}