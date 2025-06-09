'use client';

import { cn } from '@/lib/utils';

import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose';
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader';
import { ActiveTool, Editor } from '@/features/Editor/types';
import { Textarea } from '@/components/ui/textarea';

interface AiSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiSidebar = ({ editor, activeTool, onChangeActiveTool }: AiSidebarProps) => {

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
        <div className='p-4 space-y-6'>
        </div>
      </ScrollArea>
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
