'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { HeaderProvider, useHeader } from '@/contexts/HeaderContext';
import { Home, Plus, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { DemoModeToggle } from '@/components/DemoModeToggle';
import { NavigationDrawer } from '@/components/layout/NavigationDrawer';
import { SharedHeader } from '@/components/layout/SharedHeader';
import AddModal from '@/components/AddModal';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/welcome');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/diary', icon: CalendarDays, label: 'Diary' },
  ];

  return (
    <HeaderProvider>
      <div className="relative h-full flex flex-col">
        {/* Shared Header - controlled by pages via HeaderContext */}
        <SharedHeader />

        {/* Dynamic Island simulation */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 mt-3">
          <div className="dynamic-island">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto pb-16">
          {children}
        </div>

        {/* Navigation Drawer - now controlled centrally via HeaderContext */}
        <NavigationDrawerWrapper />

        {/* Add Modal */}
        <AddModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        {/* Demo Mode Toggle */}
        <DemoModeToggle />

        {/* Bottom navigation */}
        <nav className="bottom-nav">
          <div className="flex relative">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <React.Fragment key={item.href}>
                  <Link
                    href={item.href}
                    className={`bottom-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={24} className={isActive ? 'text-primary' : 'text-gray-500'} />
                    <span className={isActive ? 'text-primary' : 'text-gray-500'}>
                      {item.label}
                    </span>
                  </Link>
                  {/* Add circular + button after Home */}
                  {index === 0 && (
                    <div className="absolute left-1/2 -translate-x-1/2 -top-5">
                      <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="w-14 h-14 bg-[rgb(var(--scla-primary-blue))] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <Plus size={28} className="text-white" />
                      </button>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </nav>
      </div>
    </HeaderProvider>
  );
}

// Wrapper component to use HeaderContext inside HeaderProvider
function NavigationDrawerWrapper() {
  const { isDrawerOpen, setDrawerOpen } = useHeader();
  return (
    <NavigationDrawer 
      isOpen={isDrawerOpen} 
      onClose={() => setDrawerOpen(false)} 
    />
  );
}