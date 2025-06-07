'use client';

import { cn } from '@/lib/utils';
import { ActiveTool, Editor } from '@/features/Editor/types';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose';
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader';
import { Button } from '@/components/ui/button';

interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TextSidebar = ({ editor, activeTool, onChangeActiveTool }: TextSidebarProps) => {

  const onClose = () => {
    onChangeActiveTool('select');
  };


  return (
    <aside
      className={cn(
        'bg-white relative border-r border-gray-200 z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'text' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader title='Text' description='Add text to your canvas' />
      <ScrollArea>
        <div className='p-4 space-y-4 border-b border-gray-200'>
          <Button
            variant='secondary'
            className='w-full bg-black'
            onClick={() => editor?.addText()}
          >
            Add a textbox
          </Button>
        </div>
      </ScrollArea>
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
