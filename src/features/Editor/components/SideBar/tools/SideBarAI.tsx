'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose';
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader';
import { ActiveTool, Editor } from '@/features/Editor/types';
import { useGenerateImage } from '@/features/images/services/mutations/use-generate-image';

interface SidebarAIProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const SidebarAi = ({ editor, activeTool, onChangeActiveTool }: SidebarAIProps) => {
  const [value, setValue] = useState('');

  const mutation = useGenerateImage();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { prompt: value },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
        onError: (error: any) => {
          alert(
            'AI image generation is currently disabled. The developer has disabled this feature as it requires payment for the AI API.'
          );
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
        activeTool === 'ai' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader title='AI' description='Generate an image using AI' />
      <ScrollArea>
        <form onSubmit={onSubmit} className='p-4 space-y-6'>
          <Textarea
            disabled={mutation.isPending}
            value={value}
            placeholder='an astronaut riding a horse on mars, hd, dramatic, lighting'
            cols={30}
            rows={10}
            required
            minLength={3}
            onChange={e => setValue(e.target.value)}
          />
          <Button
            className='hover:bg-zinc-800 bg-black text-white w-full'
            type='submit'
            disabled={mutation.isPending}
          >
            Generate
          </Button>
        </form>
      </ScrollArea>
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
