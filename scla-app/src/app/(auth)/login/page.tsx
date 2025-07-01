'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Try: john.doe@example.com / password123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-white flex flex-col px-8 py-12 relative overflow-hidden">
        {/* Blue circle decoration */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[rgb(var(--scla-primary-blue))] rounded-full opacity-90" />
        {/* Back button */}
        <Link href="/welcome" className="mb-8">
          <svg className="w-6 h-6 text-[rgb(var(--scla-dark-navy))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Sign In header */}
        <h1 className="text-3xl font-bold text-[rgb(var(--scla-dark-navy))] mb-8">
          Sign In
        </h1>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[rgb(var(--scla-dark-navy))] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[rgb(var(--scla-dark-navy))] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Link href="#" className="block text-sm text-[rgb(var(--scla-primary-blue))]">
            Forgot Password?
          </Link>

          <div className="pt-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-[rgb(var(--scla-text-gray))]">
                Don't have an account?
              </span>
              <Link href="#" className="text-sm text-[rgb(var(--scla-primary-blue))] font-medium">
                Sign Up
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="scla-button-gray disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-[rgb(var(--scla-text-gray))]">OR</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => router.push('/login/six-digit')}
              className="scla-button-secondary"
            >
              Sign In Using 6-Digit Number
            </button>
            
            <button
              onClick={() => router.push('/login/qr')}
              className="scla-button-primary flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              Sign In Using QR Code
            </button>
          </div>
        </div>

        {/* Test credentials info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-[rgb(var(--scla-primary-blue))] font-medium mb-1">
            Test Credentials:
          </p>
          <p className="text-xs text-[rgb(var(--scla-text-gray))]">
            Email: john.doe@example.com<br />
            Password: password123
          </p>
        </div>
      </div>
    </div>
  );
}