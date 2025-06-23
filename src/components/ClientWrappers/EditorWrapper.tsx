'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';
import { Loader, TriangleAlert } from 'lucide-react';

import { useGetProject } from '@/features/Projects/services/queries/use-get-project';

import { Button } from '@/components/ui/button';

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
  variant?: 'fill' | 'medium' | 'small';
  params?: {
    projectId: string;
  };
}

export const EditorWrapper = ({ variant = 'fill', params }: EditorWrapperProps) => {
  const { data, isLoading, isError } = useGetProject(params ? params.projectId : '');

  if (isLoading || !data) {
    return (
      <div className='h-full flex flex-col items-center justify-center'>
        <Loader className='size-6 animate-spin text-black' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='h-full flex flex-col gap-y-5 items-center justify-center'>
        <TriangleAlert className='size-6 text-red-700' />
        <p className='text-gray-500 text-sm'>Failed to fetch project</p>
        <Button asChild variant='secondary'>
          <Link href='/'>Back to home</Link>
        </Button>
      </div>
    );
  }

  return <Editor variant={variant} initialData={data} />;
};
