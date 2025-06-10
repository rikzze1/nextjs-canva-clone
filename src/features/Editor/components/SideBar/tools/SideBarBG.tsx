'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { ActiveTool, Editor } from '@/features/Editor/types';
import { useRemoveBg } from '@/features/Images/services/mutations/use-remove-background';

import { AlertTriangle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose';
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader';

interface SidebarRemoveBG {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const SidebarRemoveBG = ({ editor, activeTool, onChangeActiveTool }: SidebarRemoveBG) => {
  const mutation = useRemoveBg();

  const selectedObject = editor?.selectedObjects[0];

  //@ts-expect-error this works
  const imageSrc = selectedObject?._originalElement?.currentSrc;

  const onClick = () => {
    mutation.mutate(
      {
        image: imageSrc,
      },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      }
    );
  };

  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r border-gray-200 z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'remove-bg' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader title='Background removal' description='Remove background from image AI' />
      {!imageSrc && (
        <div className='flex flex-col gap-y-4 items-center justify-center flex-1'>
          <AlertTriangle className='size-4 text-gray-500' />
          <p className='text-gray-500 text-xs'>feature not available for this object</p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className='p-4 space-y-4'>
            <div
              className={cn(
                'relative aspect-square rounded-md overflow-hidden transition bg-muted',
                mutation.isPending && 'opacity-50'
              )}
            >
              <Image src={imageSrc} fill alt='Image' loading='lazy' className='object-cover' />
            </div>
            <Button
              className='w-full bg-black text-white'
              onClick={onClick}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <p>Loading</p> : <p>Remove background</p>}
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
