'use client';

import { LoaderCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () =>
    import('@/features/Editor/components/Editor').then(mod => ({
      default: mod.Editor,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-screen bg-muted flex items-center justify-center'>
        <div className='text-lg'>Loading Editor...</div>
        <LoaderCircle className='size-4 animate-spin text-black' />
      </div>
    ),
  }
);

interface EditorWrapperProps {
  variant?: 'fill' | 'default';
}

export const EditorWrapper = ({ variant = 'fill' }: EditorWrapperProps) => {
  return <Editor variant={variant} />;
};
