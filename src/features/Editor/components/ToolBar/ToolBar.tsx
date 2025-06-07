'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ActiveTool, Editor } from '@/features/Editor/types';
import { ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import { FaBold, FaItalic } from 'react-icons/fa6';
import { BsBorderWidth } from 'react-icons/bs';
import { RxTransparencyGrid } from 'react-icons/rx';
import { Hint } from '@/components/Hint/Hint';
import { Button } from '@/components/ui/button';
import { isTextType } from '@/features/Editor//utils';
import { FONT_STYLE, FONT_WEIGHT } from '@/features/Editor/constants';

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ToolBar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle() || FONT_STYLE;

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    fontFamily: initialFontFamily,
    strokeColor: initialStrokeColor,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
  });

  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const selectedObject = editor?.selectedObjects[0];

  const isText = isTextType(selectedObjectType);

  const toggleBold = () => {
    if (!selectedObject) return;

    const newValue = properties.fontWeight > 500 ? 500 : 700;
    editor?.changeFontWeight(newValue);
    setProperties(current => ({
      ...current,
      fontWeight: newValue,
    }));
  };

  const toggleItalic = () => {
    if (!selectedObject) return;

    const isItalic = properties.fontStyle === 'italic';
    const newValue = isItalic ? 'normal' : 'italic';

    editor?.changeFontStyle(newValue);
    setProperties(current => ({
      ...current,
      fontStyle: newValue,
    }));
  };

  if (!editor || editor?.selectedObjects.length === 0) {
    return (
      <div className='shrink-0 h-[56px] border-b border-gray-200 bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2' />
    );
  }

  return (
    <div className='shrink-0 h-[56px] border-b border-gray-200 bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-8'>
      <div className='flex gap-2 items-center h-full justify-center'>
        <Hint label='Color' side='bottom' sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool('fill')}
            size='icon'
            variant='ghost'
            title='Color picker'
            className={cn(activeTool === 'fill' && 'bg-gray-200')}
            style={{
              backgroundColor: properties.fillColor,
            }}
          >
            <div className={`${properties.fillColor} size-3 rounded-md`} />
          </Button>
        </Hint>
      </div>
      {!isText && (
        <div className='flex gap-2 items-center h-full justify-center'>
          <Hint label='Stroke color' side='bottom' sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool('stroke-color')}
              size='icon'
              variant='ghost'
              title='Stroke color'
              className={cn(activeTool === 'stroke-color' && 'bg-gray-200')}
              style={{
                borderColor: properties.strokeColor,
              }}
            >
              <div
                className='size-4 border-2 rounded-md bg-white'
                style={{ borderColor: properties.strokeColor }}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
        <div className='flex gap-2 items-center h-full justify-center'>
          <Hint label='Stroke width' side='bottom' sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool('stroke-width')}
              size='icon'
              variant='ghost'
              title='Stroke width'
              className={cn(activeTool === 'stroke-width' && 'bg-gray-200')}
              style={{
                borderColor: properties.strokeColor,
              }}
            >
              <BsBorderWidth className='size-4' />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className='flex gap-2 items-center w-fit h-full justify-center'>
          <Hint label='Font' side='bottom' sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool('font')}
              size='icon'
              variant='ghost'
              title='Font family'
              className={cn(
                activeTool === 'font' && 'bg-gray-100',
                'w-full p-1 h-8 hover:bg-gray-200'
              )}
            >
              <div className='max-w-[60px] text-black truncate text-sm'>
                {properties.fontFamily || 'Arial'}
              </div>
              <ChevronDown className='size-4 ml-2 shrink-0' />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className='flex gap-2 items-center h-full justify-center'>
          <Hint label='Bold' side='bottom' sideOffset={5}>
            <Button
              onClick={toggleBold}
              size='icon'
              variant='ghost'
              title='Bold'
              className={cn(properties.fontWeight > 500 && 'bg-gray-200 size-6')}
            >
              <FaBold className='size-4' />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className='flex gap-2 items-center h-full justify-center'>
          <Hint label='Italic' side='bottom' sideOffset={5}>
            <Button
              onClick={toggleItalic}
              size='icon'
              variant='ghost'
              title='Italic'
              className={cn(properties.fontStyle === 'italic' && 'bg-gray-200 size-6')}
            >
              <FaItalic className='size-4' />
            </Button>
          </Hint>
        </div>
      )}
      <div className='flex gap-2 items-center h-full justify-center'>
        <Hint label='Bring forward' side='bottom' sideOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size='icon'
            variant='ghost'
            title='Bring forward'
          >
            <ArrowUp className='size-4' />
          </Button>
        </Hint>
      </div>
      <div className='flex gap-2 items-center h-full justify-center'>
        <Hint label='Send backward' side='bottom' sideOffset={5}>
          <Button
            onClick={() => editor?.sendBackwards()}
            size='icon'
            variant='ghost'
            title='Send backward'
          >
            <ArrowDown className='size-4' />
          </Button>
        </Hint>
      </div>
      <div className='flex gap-2 items-center h-full justify-center'>
        <Hint label='Opacity' side='bottom' sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool('opacity')}
            size='icon'
            variant='ghost'
            title='Opacity'
            className={cn(activeTool === 'opacity' && 'bg-gray-100')}
          >
            <RxTransparencyGrid className='size-4' />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
