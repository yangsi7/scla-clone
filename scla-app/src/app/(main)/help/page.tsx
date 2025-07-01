'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Phone, Mail, MessageCircle, FileText } from 'lucide-react';

export default function HelpPage() {
  const helpSections = [
    {
      icon: MessageCircle,
      title: 'Contact Us',
      description: 'Get in touch with our support team',
      href: '/help/contact',
    },
    {
      icon: FileText,
      title: 'FAQ',
      description: 'Frequently asked questions',
      href: '/help/faq',
    },
  ];

  const quickHelp = [
    {
      question: 'How do I pair my SKIIN device?',
      answer: 'Go to Device tab and follow the pairing instructions.',
    },
    {
      question: 'What does "No Signal" mean?',
      answer: 'This indicates your device is not properly connected or positioned.',
    },
    {
      question: 'How often should I charge my device?',
      answer: 'We recommend charging your device daily for optimal performance.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/dashboard" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          Help
        </h1>
      </header>

      {/* Help Center Header */}
      <div className="bg-[rgb(var(--scla-primary-blue))] p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">How can we help you?</h2>
        <p className="text-blue-100">Find answers and contact support</p>
      </div>

      {/* Help Sections */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          {helpSections.map((section, index) => (
            <Link
              key={index}
              href={section.href}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <section.icon size={24} className="text-[rgb(var(--scla-primary-blue))]" />
                </div>
                <div>
                  <p className="text-[rgb(var(--scla-dark-navy))] font-medium text-lg">
                    {section.title}
                  </p>
                  <p className="text-[rgb(var(--scla-text-gray))] text-sm">
                    {section.description}
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Quick Help */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Quick Help
          </h3>
          <div className="space-y-4">
            {quickHelp.map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium mb-2">
                  {item.question}
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 rounded-lg p-6 mb-6">
          <h3 className="text-red-900 font-bold text-lg mb-3">
            Medical Emergency?
          </h3>
          <p className="text-red-700 mb-4">
            If you are experiencing a medical emergency, please call emergency services immediately.
          </p>
          <a
            href="tel:911"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-medium"
          >
            <Phone size={20} />
            Call 911
          </a>
        </div>

        {/* Support Hours */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Support Hours
          </h3>
          <div className="space-y-2 text-[rgb(var(--scla-text-gray))]">
            <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
            <p>Saturday - Sunday: 10:00 AM - 4:00 PM EST</p>
            <p className="pt-3">
              <span className="font-medium text-[rgb(var(--scla-dark-navy))]">Email:</span>{' '}
              <a href="mailto:support@skiinapp.com" className="text-[rgb(var(--scla-primary-blue))]">
                support@skiinapp.com
              </a>
            </p>
            <p>
              <span className="font-medium text-[rgb(var(--scla-dark-navy))]">Phone:</span>{' '}
              <a href="tel:+18005555555" className="text-[rgb(var(--scla-primary-blue))]">
                1-800-555-5555
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}