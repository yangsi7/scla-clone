'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function WelcomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: '/images/welcome-carousel-1.jpg',
      title: 'Track Your Health',
      description: 'Monitor your heart rate, symptoms, and wellness data with SKIIN wearable technology.'
    },
    {
      image: '/images/welcome-carousel-2.jpg',
      title: 'Stay Connected',
      description: 'Keep a regular diary of your symptoms along with your SKIIN capture health & wellness data.'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="h-full bg-white flex flex-col px-8 py-8 relative overflow-hidden">
      {/* Blue circle decoration */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[rgb(var(--scla-primary-blue))] rounded-full opacity-10" />
        
      {/* Logo and tagline */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-[rgb(var(--scla-primary-blue))] mb-2">
          SKIIN
        </h1>
        <h2 className="text-xl text-[rgb(var(--scla-dark-navy))]">Track</h2>
        <p className="text-[rgb(var(--scla-text-gray))] mt-2 text-sm">
          your heart rate, location, activity and body<br />temperature.
        </p>
      </div>
      
      {/* Carousel */}
      <div className="flex-1 flex flex-col items-center justify-center mb-4">
          <div className="relative w-full max-w-sm h-80">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center"
              >
                {/* Image */}
                <div className="relative w-full h-48 mb-3 rounded-2xl overflow-hidden">
                  <Image
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                
                {/* Content */}
                <div className="text-center px-4">
                  <h3 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-2">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="text-[rgb(var(--scla-text-gray))] text-sm">
                    {slides[currentSlide].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
      {/* Page indicators */}
      <div className="flex justify-center space-x-2 mb-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide 
                ? 'bg-[rgb(var(--scla-primary-blue))]' 
                : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Get Started button */}
      <Link href="/login" className="scla-button-primary text-center mb-4">
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
  );
}