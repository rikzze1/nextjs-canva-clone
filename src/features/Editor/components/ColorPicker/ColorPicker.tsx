'use client';

import { useState, useEffect } from 'react';
import { ChromePicker, CirclePicker } from 'react-color';

import { colors } from '@/features/Editor/constants';

import { rgbaObectToString } from '@/features/Editor/utils';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className='w-full space-y-4'>
        <div className='h-[225px] bg-gray-100 rounded-lg animate-pulse' />
        <div className='h-[42px] bg-gray-100 rounded-lg animate-pulse' />
      </div>
    );
  }

  return (
    <div className='w-full space-y-4'>
      <ChromePicker
        color={value}
        onChange={color => {
          const formattedValue = rgbaObectToString(color.rgb);
          onChange(formattedValue);
        }}
        className='border rounded-lg'
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={color => {
          const formattedValue = rgbaObectToString(color.rgb);
          onChange(formattedValue);
        }}
      />
    </div>
  );
};
