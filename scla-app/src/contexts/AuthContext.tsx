'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthSession } from '@/types';
import { mockAPI } from '@/mock/api';

interface AuthContextType {
  user: User | null;
  session: AuthSession | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithQR: (qrData: string) => Promise<void>;
  loginWithSixDigit: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      setLoading(true);
      const validSession = await mockAPI.checkSession();
      if (validSession) {
        setSession(validSession);
        setUser(validSession.user);
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const authSession = await mockAPI.login(email, password);
      setSession(authSession);
      setUser(authSession.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const loginWithQR = async (qrData: string) => {
    try {
      const authSession = await mockAPI.loginWithQR(qrData);
      setSession(authSession);
      setUser(authSession.user);
    } catch (error) {
      console.error('QR login failed:', error);
      throw error;
    }
  };

  const loginWithSixDigit = async (code: string) => {
    try {
      const authSession = await mockAPI.loginWithSixDigit(code);
      setSession(authSession);
      setUser(authSession.user);
    } catch (error) {
      console.error('Six-digit login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await mockAPI.logout();
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      login,
      loginWithQR,
      loginWithSixDigit,
      logout,
      checkSession
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}