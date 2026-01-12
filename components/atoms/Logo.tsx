'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Logo({ className = '' }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`w-[150px] h-[40px] ${className}`} />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`relative w-[150px] h-[40px] ${className}`}>
      <Image
        src={isDark ? '/assets/emailat_logo_black.png' : '/assets/emailat_logo_whait.png'}
        alt="Emailat Taha Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
