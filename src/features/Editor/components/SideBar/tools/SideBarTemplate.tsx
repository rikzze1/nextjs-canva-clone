'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AlertTriangle, Loader, Crown } from 'lucide-react';

import { ActiveTool, Editor } from '@/features/Editor/types';
import { useGetTemplates } from '@/features/Projects/services/queries/use-get-templates';
import { ResponseType } from '@/features/Projects/services/queries/use-get-templates';
import { usePaywall } from '@/features/Subscriptions/hooks/use-paywall';

import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose';
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader';
import { useConfirm } from '@/hooks/use-confirm';

interface TemplateSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TemplateSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TemplateSidebarProps) => {
  const { shouldBlock, triggerPaywall } = usePaywall();
  const { data, isLoading, isError } = useGetTemplates({
    limit: '20',
    page: '1',
  });

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to replace the current project with this template.'
  );

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onClick = async (template: ResponseType['data'][0]) => {
    if (template.isPro && shouldBlock) {
      triggerPaywall();
      return;
    }

    const ok = await confirm();

    if (ok) {
      editor?.loadJSON(template.json);
    }
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r border-gray-200 z-[40] w-[360px] h-full flex flex-col overflow-hidden',
        activeTool === 'templates' ? 'visible' : 'hidden'
      )}
    >
      <ConfirmDialog />
      <ToolSideBarHeader
        title='Templates'
        description='Choose from a variety of templates to get started'
      />
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
            {data?.map(template => (
              <button
                style={{ aspectRatio: `${template.width}/${template.height}` }}
                onClick={() => onClick(template)}
                key={template.id}
                className='relative w-full border-gray-200 h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border'
              >
                <Image
                  fill
                  src={template.thumbnailUrl || ''}
                  loading='lazy'
                  alt={template.name || 'Image'}
                  className='object-cover'
                />
                {template.isPro && (
                  <div className='absolute top-2 right-2 size-8 items-center flex justify-center bg-black/50 rounded-full'>
                    <Crown className='size-4 fill-yellow-500 text-yellow-500' />
                  </div>
                )}
                <div className='opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[] truncate hover:underline p-1 bg-black/50 text-left'>
                  {template.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
