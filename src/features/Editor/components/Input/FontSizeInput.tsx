'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FontSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const FontSizeInput = ({ value, onChange }: FontSizeInputProps) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChange(value);
  };

  return (
    <div className='flex items-center'>
      <Button
        onClick={decrement}
        variant='outline'
        className='p-2 rounded-r-none border-r-0 border-gray-200 hover:bg-gray-200'
        size='icon'
      >
        <Minus className='size-4' />
      </Button>
      <Input
        onChange={handleChange}
        value={value}
        className='w-[50px] h-8 focus-visible:ring-offset-0 border-gray-200 focus-visible:ring-0 rounded-none'
      />
      <Button
        onClick={increment}
        variant='outline'
        className='p-2 rounded-l-none border-l-0 border-gray-200 hover:bg-gray-200'
        size='icon'
      >
        <Plus className='size-4' />
      </Button>
    </div>
  );
};
