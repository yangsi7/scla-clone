'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LicensesPage() {
  const router = useRouter();

  const licenses = [
    {
      name: 'React',
      version: '18.2.0',
      license: 'MIT',
      copyright: 'Copyright (c) Facebook, Inc. and its affiliates.'
    },
    {
      name: 'Next.js',
      version: '14.1.0',
      license: 'MIT',
      copyright: 'Copyright (c) 2024 Vercel, Inc.'
    },
    {
      name: 'TypeScript',
      version: '5.3.3',
      license: 'Apache-2.0',
      copyright: 'Copyright (c) Microsoft Corporation.'
    },
    {
      name: 'Tailwind CSS',
      version: '3.4.1',
      license: 'MIT',
      copyright: 'Copyright (c) Tailwind Labs, Inc.'
    },
    {
      name: 'Framer Motion',
      version: '11.0.3',
      license: 'MIT',
      copyright: 'Copyright (c) 2018 Framer B.V.'
    },
    {
      name: 'Lucide React',
      version: '0.309.0',
      license: 'ISC',
      copyright: 'Copyright (c) 2020 Lucide Contributors'
    },
    {
      name: 'React Hook Form',
      version: '7.49.3',
      license: 'MIT',
      copyright: 'Copyright (c) 2019-present Beier (Bill) Luo'
    },
    {
      name: 'Zod',
      version: '3.22.4',
      license: 'MIT',
      copyright: 'Copyright (c) 2020 Colin McDonnell'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b bg-white">
        <button 
          onClick={() => router.back()}
          className="p-1 -ml-1 mr-3 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </button>
        <h1 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))]">
          Open Source Licenses
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="text-gray-600 mb-6">
          This app is built with the following open source software:
        </p>

        <div className="space-y-4">
          {licenses.map((item) => (
            <div key={item.name} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-[rgb(var(--scla-dark-navy))]">
                  {item.name}
                </h3>
                <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                  {item.license}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Version: {item.version}</p>
              <p className="text-xs text-gray-500">{item.copyright}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Notice:</strong> This list includes the primary dependencies used in this application. 
            Each package may have its own dependencies with their respective licenses. 
            For a complete list of all dependencies and their licenses, please refer to the 
            project's package.json file.
          </p>
        </div>
      </div>
    </div>
  );
}