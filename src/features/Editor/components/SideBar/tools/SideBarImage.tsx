'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { UploadDropzone } from '@/lib/uploadthing';
import { useState } from 'react';

import { AlertTriangle, Loader } from 'lucide-react';
import { ActiveTool, Editor } from '@/features/Editor/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose';
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader';

import { useGetImages } from '@/features/Images/services/queries/use-get-images';

interface ImageSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ImageSidebar = ({ editor, activeTool, onChangeActiveTool }: ImageSidebarProps) => {
  const { data, isSuccess, isLoading, isError } = useGetImages();
  const [isUploading, setIsUploading] = useState(false);

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
      <div className='p-4 border-b border-gray-100'>
        {isUploading ? (
          <div className='flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50'>
            <div className='text-center'>
              <Loader className='h-8 w-8 animate-spin text-blue-500 mx-auto mb-2' />
              <p className='text-sm text-gray-600'>Uploading image...</p>
            </div>
          </div>
        ) : (
          <UploadDropzone
            appearance={{
              container: {
                height: '120px',
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                backgroundColor: '#f9fafb',
                padding: '16px',
              },
              uploadIcon: {
                width: '32px',
                height: '32px',
                color: '#6b7280',
              },
              label: {
                fontSize: '14px',
                color: '#374151',
                fontWeight: '500',
              },
              allowedContent: {
                fontSize: '12px',
                color: '#6b7280',
              },
              button: {
                fontSize: '12px',
                padding: '6px 12px',
                height: '32px',
                backgroundColor: '#3b82f6',
                borderRadius: '6px',
              },
            }}
            content={{
              label: 'Choose file or drag and drop',
              allowedContent: 'Image (4MB)',
            }}
            endpoint='imageUploader'
            onUploadBegin={() => {
              setIsUploading(true);
            }}
            onClientUploadComplete={res => {
              setIsUploading(false);
              if (res && res[0]) {
                editor?.addImage(res[0].ufsUrl || res[0].ufsUrl);
              }
            }}
            onUploadError={error => {
              setIsUploading(false);
              console.error('Upload failed:', error);
              alert(`Upload failed: ${error.message}`);
            }}
          />
        )}
      </div>
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
                    className='opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate hover:underline p-1 bg-black/50 text-left'
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
