'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/components/utils/cn';
import { Icon } from './Icon';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Modal({ isOpen, onClose, title, children, className }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className={cn(
          'bg-white dark:bg-[#1a202c] rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200',
          className
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e6ebf4] dark:border-gray-800">
          <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-background-light dark:hover:bg-gray-800 text-[#4563a1] dark:text-gray-400 transition-colors"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
