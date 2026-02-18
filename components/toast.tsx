'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-card border border-accent shadow-2xl rounded-xl p-4 flex items-center gap-3 min-w-[300px]">
        <CheckCircle className="w-6 h-6 text-accent shrink-0" />
        <p className="text-foreground font-medium grow">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded transition-colors shrink-0"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
