'use client';

import { cn } from '@/lib/utils';
import { ActiveTool, Editor } from '@/features/Editor/types';
import { FILTERS } from '@/features/Editor/constants';

import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose';
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader';
import { Button } from '@/components/ui/button';

interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FilterSidebar = ({ editor, activeTool, onChangeActiveTool }: FilterSidebarProps) => {
  const value = null;

  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r border-gray-200 z-[40] w-[360px] h-full flex flex-col overflow-hidden',
        activeTool === 'filter' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader title='Filters' description='Apply a filter to your selected image' />
      <ScrollArea className='flex-1 overflow-y-auto'>
        <div className='p-4 space-y-2'>
          {FILTERS.map(filter => (
            <Button
              key={filter}
              variant='secondary'
              size='lg'
              title='filters'
              className={cn(
                'w-full h-16 justify-start hover:bg-gray-200 text-left',
                value === filter && 'border-2 border-blue-500'
              )}
              onClick={() => editor?.changeImageFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
