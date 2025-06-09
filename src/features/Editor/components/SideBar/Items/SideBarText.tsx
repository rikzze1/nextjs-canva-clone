'use client';

import { cn } from '@/lib/utils';
import { ActiveTool, Editor } from '@/features/Editor/types';
import { ScrollArea } from '@/components/ui/scroll-area';
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
            className='w-full bg-black text-white hover:bg-zinc-700'
            onClick={() => editor?.addText('Textbox')}
          >
            Add a textbox
          </Button>
          <Button
            variant='secondary'
            size='lg'
            className='w-full h-16 bg-gray-100 text-black hover:bg-gray-200'
            onClick={() =>
              editor?.addText('Heading', {
                fontSize: 80,
                fontWeight: 700,
              })
            }
          >
            <span className='text-3xl font-bold'>Add a heading</span>
          </Button>
          <Button
            variant='secondary'
            size='lg'
            className='w-full h-16 bg-gray-100 text-black hover:bg-gray-200'
            onClick={() =>
              editor?.addText('Subheading', {
                fontSize: 44,
                fontWeight: 600,
              })
            }
          >
            <span className='text-2xl font-semibold'>Add a subheading</span>
          </Button>
          <Button
            variant='secondary'
            size='lg'
            className='w-full h-16 bg-gray-100 text-black hover:bg-gray-200'
            onClick={() =>
              editor?.addText('Paragraph', {
                fontSize: 32,
              })
            }
          >
            Add a Paragraph
          </Button>
        </div>
      </ScrollArea>
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
