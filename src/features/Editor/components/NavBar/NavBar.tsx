'use client';

import { ChevronDown, Download, Loader, MousePointerClick, Redo2, Undo2 } from 'lucide-react';
import React from 'react';
import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs';
import { CiFileOn } from 'react-icons/ci';
import { useFilePicker } from 'use-file-picker';
import { cn } from '@/lib/utils';

import { Hint } from '@/components/Hint/Hint';
import { Logo } from '@/components/Logo/Logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ActiveTool, Editor } from '@/features/Editor/types';
import { UserButton } from '@/components/Button/UserButton';
import { useMutationState } from '@tanstack/react-query';

interface NavbarProps {
  id: string;
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const NavBar = ({ id, editor, activeTool, onChangeActiveTool }: NavbarProps) => {
  const data = useMutationState({
    filters: {
      mutationKey: ['project', { id }],
      exact: true,
    },
    select: mutation => mutation.state.status,
  });

  const currentStatus = data[data.length - 1];

  const isError = currentStatus === 'error';
  const isPending = currentStatus === 'pending';

  const { openFilePicker } = useFilePicker({
    accept: '.json',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = () => {
          editor?.loadJSON(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className='w-full z-50 flex items-center p-4 h-[68px] gap-x-4 bg-white border-gray-100 border-b lg:pl-[34px] overflow-hidden min-w-0'>
      <Logo variant='small' />
      <div className='w-full flex items-center gap-x-1 h-full min-w-0 flex-shrink'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              size='sm'
              variant='ghost'
              className='hover:bg-gray-200/60 cursor-pointer hover:opacity-80 transition'
            >
              File
              <ChevronDown className='size-4 ml-2' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='min-w-60 border-gray-200 bg-white border-0'>
            <DropdownMenuItem
              onClick={() => openFilePicker()}
              className='flex items-center gap-x-2 cursor-pointer'
            >
              <CiFileOn className='size-8' />
              <div className='text-xs text-muted-foreground'>
                <p>Open</p>
                <p>Open a JSON file</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation='vertical' className='mx-2 bg-gray-200' />
        <Hint label='Select' side='bottom' sideOffset={10}>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => onChangeActiveTool('select')}
            title='select'
            className={cn('cursor-pointer', activeTool === 'select' && 'bg-gray-100')}
          >
            <MousePointerClick className='size-4' />
          </Button>
        </Hint>
        <Hint label='Undo' side='bottom' sideOffset={10}>
          <Button
            disabled={!editor?.canUndo()}
            variant='ghost'
            size='icon'
            title='undo'
            onClick={() => editor?.onUndo()}
            className='cursor-pointer'
          >
            <Undo2 className='size-4' />
          </Button>
        </Hint>
        <Hint label='Redo' side='bottom' sideOffset={10}>
          <Button
            disabled={!editor?.canRedo()}
            variant='ghost'
            size='icon'
            title='redo'
            onClick={() => editor?.onRedo()}
            className='cursor-pointer'
          >
            <Redo2 className='size-4' />
          </Button>
        </Hint>
        <Separator orientation='vertical' className='mx-2 bg-gray-200' />
        {isPending && (
          <div className='flex items-center gap-x-2'>
            <Loader className='size-4 animate-spin text-muted-foreground' />
            <div className='text-xs text-gray-500'>Saving...</div>
          </div>
        )}
        {!isPending && isError && (
          <div className='flex items-center gap-x-2'>
            <BsCloudSlash className='size-[20px] text-muted-foreground' />
            <div className='text-xs text-gray-500'>Failed to save</div>
          </div>
        )}
        {!isPending && !isError && (
          <div className='flex items-center gap-x-2'>
            <BsCloudCheck className='size-[20px] text-muted-foreground' />
            <div className='text-xs text-gray-500'>Saved</div>
          </div>
        )}
        <div className='ml-auto flex items-center gap-x-2 flex-shrink-0'>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size='sm' variant='ghost' className='hover:bg-zinc-100 hover:cursor-pointer'>
                Export
                <Download className='size-4 ml-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='min-w-60 border-gray-200 bg-white'>
              <DropdownMenuItem
                onClick={() => editor?.saveJSON()}
                className='flex items-center gap-x-2'
              >
                <CiFileOn className='size-8' />
                <div>
                  <p>JSON</p>
                  <p className='text-xs text-gray-500'>Save for later editing</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.savePNG()}
                className='flex items-center gap-x-2'
              >
                <CiFileOn className='size-8' />
                <div>
                  <p>PNG</p>
                  <p className='text-xs text-gray-500'>Best sharing on the web</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.saveJPG()}
                className='flex items-center gap-x-2'
              >
                <CiFileOn className='size-8' />
                <div>
                  <p>JPEG</p>
                  <p className='text-xs text-gray-500'>Best for printing</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.saveSVG()}
                className='flex items-center gap-x-2'
              >
                <CiFileOn className='size-8' />
                <div>
                  <p>SVG</p>
                  <p className='text-xs text-gray-500'>Best for editing vector</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
