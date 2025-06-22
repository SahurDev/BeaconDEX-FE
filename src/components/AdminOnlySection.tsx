'use client';

import { ReactNode } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

interface AdminOnlySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function AdminOnlySection({ children, fallback }: AdminOnlySectionProps) {
  const { isConnected, isAdmin, address } = useAdmin();

  // If not connected, show connect wallet message
  if (!isConnected) {
    return (
      <Card className={cn("bg-black/30 border-red-500/20 backdrop-blur-xl")}>
        <CardContent className="p-6 text-center">
          <div className="text-red-400 mb-2">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-gray-400">Connect your wallet to access this section</p>
        </CardContent>
      </Card>
    );
  }

  // If connected but not admin, show access denied
  if (!isAdmin) {
    return fallback || (
      <Card className={cn("bg-black/30 border-red-500/20 backdrop-blur-xl")}>
        <CardContent className="p-6 text-center">
          <div className="text-red-400 mb-2">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
            </svg>
          </div>
          <h3 className="text-red-400 font-semibold mb-2">Admin Access Required</h3>
          <p className="text-gray-400 text-sm mb-3">
            Only administrators can access this section
          </p>
          <div className="text-xs text-gray-500 font-mono">
            Connected: {address}
          </div>
        </CardContent>
      </Card>
    );
  }

  // If admin, show the content
  return (
    <div className="relative">
      {/* Admin Badge */}
      <div className="absolute -top-2 -right-2 z-10">
        <div className="bg-gradient-to-r from-primary to-accent px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>ADMIN</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}