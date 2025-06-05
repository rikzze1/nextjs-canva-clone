'use client';

import type { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons/lib';

import { cn } from '@/lib/utils';

interface ToolShapeProps {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
}

export const ToolShape = ({ onClick, icon: Icon, iconClassName }: ToolShapeProps) => {
  return (
    <button
      onClick={onClick}
      title='tool'
      className='aspect-square border border-gray-200 rounded-md p-5'
    >
      <Icon className={cn('h-full w-full fill-black', iconClassName)} />
    </button>
  );
};
