'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WelcomePage() {
  return (
    <div className="mobile-container">
      <div className="min-h-screen flex flex-col px-8 py-12">
        {/* Status bar placeholder */}
        <div className="h-12" />
        
        {/* Logo and tagline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[rgb(var(--scla-primary-blue))] mb-4">
            SKIIN
          </h1>
          <h2 className="text-2xl text-[rgb(var(--scla-dark-navy))]">Track</h2>
          <p className="text-[rgb(var(--scla-text-gray))] mt-2">
            your heart rate, location, activity and body temperature.
          </p>
        </div>
        
        {/* Illustration */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-64 h-64"
          >
            {/* Placeholder for illustration - in real app would use Image component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-blue-50 rounded-full flex items-center justify-center">
                <svg className="w-24 h-24 text-[rgb(var(--scla-primary-blue))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            
            {/* Floating icons */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-0 right-0 w-12 h-12 bg-[rgb(var(--scla-error-red))] rounded-lg flex items-center justify-center"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              className="absolute bottom-0 left-0 w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 2 }}
              className="absolute top-1/2 right-0 w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Page indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-2 h-2 bg-[rgb(var(--scla-primary-blue))] rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>
        
        {/* Welcome text */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-2">
            Welcome
          </h3>
          <p className="text-[rgb(var(--scla-text-gray))]">
            Get started using Skiin today!
          </p>
        </div>
        
        {/* Get Started button */}
        <Link href="/login" className="scla-button-primary text-center mb-6">
          Get Started
        </Link>
        
        {/* Sign in link */}
        <p className="text-center text-[rgb(var(--scla-text-gray))]">
          Already have an account?{' '}
          <Link href="/login" className="text-[rgb(var(--scla-primary-blue))] font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}