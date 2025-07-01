'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, User, Settings, HelpCircle, FileText, LogOut, ChevronRight, Building2, Globe, Info, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavigationDrawer({ isOpen, onClose }: NavigationDrawerProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: User, label: 'User Settings', href: '/settings/profile' },
    { icon: Smartphone, label: 'Devices', href: '/device' },
    { icon: Building2, label: 'View Clinic', href: '/clinic' },
    { icon: Globe, label: 'Language', href: '/settings/language' },
    { icon: Info, label: 'About', href: '/about' },
    { icon: HelpCircle, label: 'Help', href: '/help' },
    { icon: Settings, label: 'Advanced Settings', href: '/settings/advanced' },
  ];

  const handleLogout = async () => {
    await logout();
    onClose();
    router.push('/welcome');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))]">
                  Menu
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* User Info */}
            {user && (
              <div className="p-4 bg-gray-50 border-b border-border">
                <div className="space-y-1">
                  <p className="font-medium text-[rgb(var(--scla-dark-navy))]">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-[rgb(var(--scla-text-gray))]">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-border"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="text-gray-600" />
                    <span className="text-[rgb(var(--scla-dark-navy))]">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border space-y-3">
              <button
                onClick={() => {
                  onClose();
                  router.push('/delete-account');
                }}
                className="w-full text-left text-red-600 hover:text-red-700 font-medium"
              >
                Delete Account
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <LogOut size={20} className="text-gray-600" />
                <span className="font-medium text-[rgb(var(--scla-dark-navy))]">
                  Sign Out
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}