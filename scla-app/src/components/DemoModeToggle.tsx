'use client';

import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { demoManager, DemoScenario } from '@/lib/demo-scenarios';
import { useToast } from '@/components/ui/toast';

export function DemoModeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const scenarios = [
    { id: 'new-user' as DemoScenario, label: 'New User', description: 'Fresh account with no data' },
    { id: 'active-user' as DemoScenario, label: 'Active User', description: '30 days of health data' },
    { id: 'critical-alert' as DemoScenario, label: 'Critical Alert', description: 'High severity symptoms' },
    { id: 'study-complete' as DemoScenario, label: 'Study Complete', description: '14-day Holter study done' },
  ];

  const activateScenario = async (scenario: DemoScenario) => {
    setLoading(true);
    try {
      await demoManager.activateScenario(scenario);
      showToast('success', `Demo scenario "${scenario}" activated`);
      setIsOpen(false);
      // Refresh the page to reload with new data
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      showToast('error', 'Failed to activate demo scenario');
    } finally {
      setLoading(false);
    }
  };

  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      {/* Floating Demo Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 w-12 h-12 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition-colors z-30"
      >
        <Sparkles size={20} />
      </button>

      {/* Demo Mode Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 bg-white rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={20} className="text-purple-600" />
                  <h3 className="font-semibold text-[rgb(var(--scla-dark-navy))]">
                    Demo Scenarios
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => activateScenario(scenario.id)}
                    disabled={loading}
                    className="w-full text-left p-3 rounded-lg border border-border hover:border-purple-400 hover:bg-purple-50 transition-all disabled:opacity-50"
                  >
                    <div className="font-medium text-[rgb(var(--scla-dark-navy))]">
                      {scenario.label}
                    </div>
                    <div className="text-sm text-[rgb(var(--scla-text-gray))]">
                      {scenario.description}
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-4 bg-purple-50 border-t border-purple-100">
                <p className="text-xs text-purple-700">
                  Demo mode helps showcase different app states. All data will be reset when switching scenarios.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}