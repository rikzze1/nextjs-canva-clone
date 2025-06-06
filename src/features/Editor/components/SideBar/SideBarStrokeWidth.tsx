'use client';

import { cn } from '@/lib/utils';

import { STROKE_DASH_ARRAY, STROKE_WIDTH } from '@/features/Editor/constants';
import { ActiveTool, Editor } from '@/features/Editor/types';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose';
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface StrokeWidthProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthProps) => {
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChangeStrokeWidth = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r border-gray-200 z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'stroke-width' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader title='Stroke options' description='Modify the stroke of your element' />
      <ScrollArea>
        <div className='p-4 space-y-4 border-b border-gray-200'>
          <Label className='text-sm'>Stroke width</Label>
          <Slider value={[widthValue]} onValueChange={values => onChangeStrokeWidth(values[0])} />
        </div>
        <div className='p-4 space-y-4 border-b border-gray-200'>
          <Label className='text-sm'>Stroke type</Label>
          <Button
            onClick={() => onChangeStrokeType([])}
            variant='secondary'
            size='lg'
            className={cn(
              'w-full h-16 justify-start text-left cursor-pointer hover:bg-gray-100',
              JSON.stringify(typeValue) === `[]` && 'border border-blue-500'
            )}
            style={{
              padding: '8px 16px',
            }}
          >
            <div className='w-full border-black rounded-full border-4' />
          </Button>
          <Button
            onClick={() => onChangeStrokeType([5, 5])}
            variant='secondary'
            size='lg'
            className={cn(
              'w-full h-16 justify-start text-left cursor-pointer hover:bg-gray-100',
              JSON.stringify(typeValue) === `[5,5]` && 'border border-blue-500'
            )}
            style={{
              padding: '8px 16px',
            }}
          >
            <div className='w-full border-black rounded-full border-4 border-dashed' />
          </Button>
        </div>
      </ScrollArea>
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
