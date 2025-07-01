'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqs: FAQItem[] = [
    {
      category: 'Getting Started',
      question: 'How do I set up my SKIIN device?',
      answer: 'To set up your SKIIN device: 1) Download the SCLA app, 2) Create an account, 3) Go to the Device tab, 4) Follow the on-screen pairing instructions. Make sure your device is charged and within Bluetooth range.',
    },
    {
      category: 'Getting Started',
      question: 'What are the system requirements?',
      answer: 'The SCLA app requires iOS 13.0 or later, or Android 8.0 or later. Your phone must have Bluetooth 4.0 or higher for device connectivity.',
    },
    {
      category: 'Device & Connection',
      question: 'Why does my device show "No Signal"?',
      answer: 'A "No Signal" status can occur due to: 1) Poor skin contact - ensure the garment fits snugly, 2) Low battery - charge your device, 3) Bluetooth disconnection - check your phone\'s Bluetooth settings, 4) Garment positioning - adjust according to the placement guide.',
    },
    {
      category: 'Device & Connection',
      question: 'How long does the battery last?',
      answer: 'The SKIIN device battery typically lasts 24-48 hours with continuous monitoring. Battery life varies based on usage patterns and signal quality. We recommend charging nightly.',
    },
    {
      category: 'Device & Connection',
      question: 'Can I wear the device while showering?',
      answer: 'The SKIIN device is water-resistant but not waterproof. Remove it before showering, swimming, or any water activities to prevent damage.',
    },
    {
      category: 'Health Monitoring',
      question: 'How accurate is the ECG monitoring?',
      answer: 'SKIIN devices use medical-grade sensors that are FDA-cleared for ECG monitoring. The accuracy is comparable to traditional ECG machines when properly worn and positioned.',
    },
    {
      category: 'Health Monitoring',
      question: 'What symptoms should I log?',
      answer: 'Log any cardiac-related symptoms such as chest pain, shortness of breath, palpitations, dizziness, or fatigue. Also log activities or situations that trigger symptoms.',
    },
    {
      category: 'Health Monitoring',
      question: 'How often should I check my blood pressure?',
      answer: 'Follow your doctor\'s recommendations. Generally, checking twice daily (morning and evening) provides good baseline data. Check more frequently if advised by your healthcare provider.',
    },
    {
      category: 'Data & Privacy',
      question: 'Is my health data secure?',
      answer: 'Yes, all data is encrypted and stored according to HIPAA compliance standards. We use bank-level security to protect your personal health information.',
    },
    {
      category: 'Data & Privacy',
      question: 'Can I share my data with my doctor?',
      answer: 'Yes, you can generate reports and share your health data directly with your healthcare provider through the app. Go to Settings > Advanced Settings > Data Export.',
    },
    {
      category: 'Troubleshooting',
      question: 'The app is not connecting to my device',
      answer: 'Try these steps: 1) Restart both your phone and SKIIN device, 2) Ensure Bluetooth is enabled, 3) Check that the device is charged, 4) Remove and re-pair the device in Settings.',
    },
    {
      category: 'Troubleshooting',
      question: 'My ECG readings look abnormal',
      answer: 'First, check that the garment is properly positioned and making good skin contact. If readings continue to appear abnormal, contact your healthcare provider immediately. Do not use the app for self-diagnosis.',
    },
  ];

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/help" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          Frequently Asked Questions
        </h1>
      </header>

      {/* FAQ Content */}
      <div className="p-4">
        {categories.map((category) => (
          <div key={category} className="mb-6">
            <h2 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-3 px-2">
              {category}
            </h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {faqs
                .filter(faq => faq.category === category)
                .map((faq, index) => {
                  const globalIndex = faqs.indexOf(faq);
                  const isExpanded = expandedItems.includes(globalIndex);
                  
                  return (
                    <div
                      key={globalIndex}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <button
                        onClick={() => toggleExpanded(globalIndex)}
                        className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-[rgb(var(--scla-dark-navy))] font-medium pr-4">
                            {faq.question}
                          </p>
                          {isExpanded ? (
                            <ChevronUp size={20} className="text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4">
                          <p className="text-[rgb(var(--scla-text-gray))] leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        {/* Still Need Help */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-2">
            Still need help?
          </h3>
          <p className="text-[rgb(var(--scla-text-gray))] mb-4">
            Our support team is here to assist you
          </p>
          <Link
            href="/help/contact"
            className="inline-block bg-[rgb(var(--scla-primary-blue))] text-white rounded-full py-3 px-6 font-medium hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}