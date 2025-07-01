'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export default function LanguageSettingsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // In a real app, this would save to user preferences
    showToast('success', 'Language preference updated');
    // Navigate back after a short delay
    setTimeout(() => {
      router.push('/settings/profile');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/settings/profile" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          Language
        </h1>
      </header>

      {/* Language Info Card */}
      <div className="p-4">
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-[rgb(var(--scla-dark-navy))] text-sm">
            Select your preferred language. The app content will be displayed in the selected language where available.
          </p>
        </div>
      </div>

      {/* Language List */}
      <div className="bg-white">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageSelect(language.code)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-200"
          >
            <div className="flex flex-col items-start">
              <span className="text-[rgb(var(--scla-dark-navy))] font-medium">
                {language.name}
              </span>
              <span className="text-[rgb(var(--scla-text-gray))] text-sm">
                {language.nativeName}
              </span>
            </div>
            {selectedLanguage === language.code && (
              <Check size={20} className="text-[rgb(var(--scla-primary-blue))]" />
            )}
          </button>
        ))}
      </div>

      {/* Footer Note */}
      <div className="p-4 mt-6">
        <p className="text-[rgb(var(--scla-text-gray))] text-sm text-center">
          Note: Not all content may be available in all languages. 
          Medical content and critical information will always be shown in English.
        </p>
      </div>
    </div>
  );
}