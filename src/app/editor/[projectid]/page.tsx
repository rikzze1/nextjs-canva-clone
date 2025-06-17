'use client';

import { LoaderCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

import { protectServer } from '@/features/auth/utils';

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

const EditorProjectIdPage = async () => {
  await protectServer();

  return (
    <div className='w-full h-screen overflow-hidden'>
      <Editor variant='fill' />
    </div>
  );
};

export default EditorProjectIdPage;
