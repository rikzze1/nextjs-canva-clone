'use client';

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
      </div>
    ),
  }
);

const EditorProjectIdPage = () => {
  return (
    <div className='w-full h-screen'>
      <Editor variant='fill' />
    </div>
  );
};

export default EditorProjectIdPage;
