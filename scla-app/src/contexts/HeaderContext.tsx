'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface HeaderConfig {
  title?: string;
  showMenuButton?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
  rightActions?: ReactNode;
  customHeader?: ReactNode;
  className?: string;
}

interface HeaderContextType {
  config: HeaderConfig;
  setConfig: (config: HeaderConfig) => void;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<HeaderConfig>({
    showMenuButton: true,
  });
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <HeaderContext.Provider value={{ config, setConfig, isDrawerOpen, setDrawerOpen }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within HeaderProvider');
  }
  return context;
}