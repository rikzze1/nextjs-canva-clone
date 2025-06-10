'use client';


import { cn } from '@/lib/utils';
import { STROKE_COLOR, STROKE_WIDTH } from '@/features/Editor/constants';

import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from '@/features/Editor/components/ColorPicker/ColorPicker';
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose';
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader';
import { ActiveTool, Editor } from '@/features/Editor/types';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface DrawProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const DrawSidebar = ({ editor, activeTool, onChangeActiveTool }: DrawProps) => {
  const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onClose = () => {
    editor?.disableDrawingMode();
    onChangeActiveTool('select');
  };

  const onColorChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  const onWdithChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r border-gray-200 z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'draw' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader
        title='Drawing mode'
        description='Modify brush settings'
      />
      <ScrollArea>
        <div className='p-4 space-y-6 border-b'>
          <Label className='text-sm'>
            Brush width
          </Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => {
              onWdithChange(values[0]);
            }}
          >

          </Slider>
        </div>
        <div className='p-4 space-y-6'>
          <ColorPicker value={colorValue} onChange={onColorChange} />
        </div>
      </ScrollArea>
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
