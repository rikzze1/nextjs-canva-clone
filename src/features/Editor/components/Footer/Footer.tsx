'use client';

import { Minimize, ZoomIn, ZoomOut } from 'lucide-react';
import { Hint } from '@/components/Hint/Hint';
import { Button } from '@/components/ui/button';
import { Editor } from '@/features/Editor/types';

interface FooterProps {
  editor: Editor | undefined;
}

export const Footer = ({ editor }: FooterProps) => {
  return (
    <footer className='absolute bottom-0 left-0 right-0 h-[52px] border-t border-gray-100 bg-white w-full flex items-center overflow-x-hidden z-[49] p-2 gap-x-1 shrink-0 px-4 flex-row-reverse'>
      <Hint label='Minimize' side='top' sideOffset={10}>
        <Button
          onClick={() => {
            editor?.autoZoom();
          }}
          size='icon'
          variant='ghost'
          className='h-full'
        >
          <Minimize className='size-4' />
        </Button>
      </Hint>
      <Hint label='Zoom in' side='top' sideOffset={10}>
        <Button
          onClick={() => {
            editor?.zoomIn();
          }}
          size='icon'
          variant='ghost'
          className='h-full'
        >
          <ZoomIn className='size-4' />
        </Button>
      </Hint>
      <Hint label='Zoom out' side='top' sideOffset={10}>
        <Button
          onClick={() => {
            editor?.zoomOut();
          }}
          size='icon'
          variant='ghost'
          className='h-full'
        >
          <ZoomOut className='size-4' />
        </Button>
      </Hint>
    </footer>
  );
};
