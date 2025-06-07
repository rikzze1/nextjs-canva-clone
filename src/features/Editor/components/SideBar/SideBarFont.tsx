'use client';

import { cn } from '@/lib/utils';
import { ActiveTool, Editor } from '@/features/Editor/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose';
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader';
import { Button } from '@/components/ui/button';
import { fonts } from '@/features/Editor/constants';

interface FontSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FontSidebar = ({ editor, activeTool, onChangeActiveTool }: FontSidebarProps) => {
  const value = editor?.getActiveFontFamily();

  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r border-gray-200 z-[40] w-[360px] h-full flex flex-col overflow-hidden',
        activeTool === 'font' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader title='Text' description='Change the text font' />
      <ScrollArea className='flex-1 overflow-y-auto'>
        <div className='p-4 space-y-2'>
          {fonts.map(font => (
            <Button
              key={font}
              variant='secondary'
              size='lg'
              className={cn(
                'w-full h-16 justify-start text-left',
                value === font && 'border-2 border-blue-500'
              )}
              style={{
                fontFamily: font,
                fontSize: '16px',
                padding: '8px 16px',
              }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
