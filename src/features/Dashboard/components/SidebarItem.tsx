import React from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SidebarItemsProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({ icon: Icon, label, href, isActive, onClick }: SidebarItemsProps) => {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={cn(
          'flex flex-row gap-2 items-center px-3 py-3 rounded-xl bg-white hover:bg-white/80 transition',
          isActive && 'bg-white'
        )}
      >
        <Icon />
        <span className='text-sm font-medium'>{label}</span>
      </div>
    </Link>
  );
};
