'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

import { AlertTriangle, Loader } from 'lucide-react';
import { ActiveTool, Editor } from '@/features/Editor/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose';
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader';

import { useGetImages } from '@/features/images/services/queries/use-get-images';
import Link from 'next/link';

interface ImageSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ImageSidebar = ({ editor, activeTool, onChangeActiveTool }: ImageSidebarProps) => {
  const { data, isSuccess, isLoading, isError } = useGetImages();

  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r border-gray-200 z-[40] w-[360px] h-full flex flex-col overflow-hidden',
        activeTool === 'images' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader title='Image' description='Add images to your canvas' />
      {isLoading && (
        <div className='flex items-center justify-center flex-1'>
          <Loader className='size-5 text-black animate-spin' />
        </div>
      )}
      {isError && (
        <div className='flex flex-col gap-4 items-center justify-center flex-1'>
          <AlertTriangle className='size-4 text-black' />
          <p className='text-gray-700 text-xs'>Failed to fetch images</p>
        </div>
      )}
      <ScrollArea className='flex-1 overflow-y-auto'>
        <div className='p-4'>
          <div className='grid grid-cols-2 gap-4'>
            {isSuccess &&
              data?.map(image => (
                <button
                  onClick={() => editor?.addImage(image.urls.regular)}
                  key={image.id}
                  className='relative w-full border-gray-200 h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border'
                >
                  <Image
                    fill
                    src={image.urls.small}
                    loading='lazy'
                    alt={image.alt_description ?? 'Image'}
                    className='object-cover'
                  />
                  <Link
                    target='_blank'
                    href={image.links.html}
                    className='opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50 text-left'
                  >
                    {image.user.name}
                  </Link>
                </button>
              ))}
          </div>
        </div>
      </ScrollArea>
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
