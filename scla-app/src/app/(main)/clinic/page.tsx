'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, MapPin, Phone, Clock, Globe } from 'lucide-react';

export default function ViewClinicPage() {
  // Mock clinic data
  const clinic = {
    name: 'CARDIO WELLNESS CENTER',
    address: '123 Medical Plaza, Suite 400',
    city: 'Toronto, ON M5V 3A8',
    phone: '+1 (416) 555-0123',
    hours: {
      weekdays: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    website: 'www.cardiowellness.ca',
    email: 'info@cardiowellness.ca',
    doctors: [
      'Dr. Sarah Mitchell, MD',
      'Dr. James Chen, MD',
      'Dr. Emily Rodriguez, MD'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/dashboard" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          View Clinic
        </h1>
      </header>

      {/* Clinic Information Card */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Clinic Header */}
          <div className="bg-[rgb(var(--scla-primary-blue))] p-6">
            <h2 className="text-white font-bold text-lg uppercase tracking-wide">
              {clinic.name}
            </h2>
          </div>

          {/* Contact Information */}
          <div className="p-6 space-y-6">
            {/* Address */}
            <div className="flex gap-4">
              <MapPin size={20} className="text-[rgb(var(--scla-primary-blue))] mt-1 flex-shrink-0" />
              <div>
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">Address</p>
                <p className="text-[rgb(var(--scla-text-gray))] mt-1">
                  {clinic.address}<br />
                  {clinic.city}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <Phone size={20} className="text-[rgb(var(--scla-primary-blue))] mt-1 flex-shrink-0" />
              <div>
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">Phone</p>
                <a 
                  href={`tel:${clinic.phone}`}
                  className="text-[rgb(var(--scla-primary-blue))] mt-1 block"
                >
                  {clinic.phone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <Clock size={20} className="text-[rgb(var(--scla-primary-blue))] mt-1 flex-shrink-0" />
              <div>
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">Hours</p>
                <div className="text-[rgb(var(--scla-text-gray))] mt-1 space-y-1">
                  <p>Monday - Friday: {clinic.hours.weekdays}</p>
                  <p>Saturday: {clinic.hours.saturday}</p>
                  <p>Sunday: {clinic.hours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="flex gap-4">
              <Globe size={20} className="text-[rgb(var(--scla-primary-blue))] mt-1 flex-shrink-0" />
              <div>
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">Website</p>
                <a 
                  href={`https://${clinic.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgb(var(--scla-primary-blue))] mt-1 block"
                >
                  {clinic.website}
                </a>
              </div>
            </div>
          </div>

          {/* Doctors Section */}
          <div className="border-t border-gray-200 p-6">
            <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold uppercase text-sm tracking-wide mb-4">
              YOUR HEALTHCARE PROVIDERS
            </h3>
            <div className="space-y-3">
              {clinic.doctors.map((doctor, index) => (
                <div key={index} className="text-[rgb(var(--scla-text-gray))]">
                  {doctor}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Button */}
          <div className="p-6 pt-0">
            <a
              href={`mailto:${clinic.email}`}
              className="w-full bg-[rgb(var(--scla-primary-blue))] text-white rounded-full py-3 px-6 font-medium text-center block hover:bg-blue-700 transition-colors"
            >
              Contact Clinic
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}