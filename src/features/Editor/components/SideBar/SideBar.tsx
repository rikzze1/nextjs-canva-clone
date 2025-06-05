'use client';

import { LayoutTemplate, ImageIcon, Settings, Shapes, Sparkles, Type } from 'lucide-react';

import { SideBarItem } from '@/features/Editor/components/SideBar/SideBarItem';
import { ActiveTool } from '@/features/Editor/types';

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const SideBar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
  return (
    <aside className='bg-white flex flex-col w-[100px] h-full border-r border-gray-200 overflow-y-auto'>
      <ul className='flex flex-col'>
        <li>
          <SideBarItem
            icon={LayoutTemplate}
            label='Design'
            isActive={activeTool === 'templates'}
            onClick={() => onChangeActiveTool('templates')}
          />
        </li>
        <li>
          <SideBarItem
            icon={ImageIcon}
            label='Image'
            isActive={activeTool === 'images'}
            onClick={() => onChangeActiveTool('images')}
          />
        </li>
        <li>
          <SideBarItem
            icon={Type}
            label='Text'
            isActive={activeTool === 'text'}
            onClick={() => onChangeActiveTool('text')}
          />
        </li>
        <li>
          <SideBarItem
            icon={Shapes}
            label='Shapes'
            isActive={activeTool === 'shapes'}
            onClick={() => onChangeActiveTool('shapes')}
          />
        </li>
        <li>
          <SideBarItem
            icon={Sparkles}
            label='AI'
            isActive={activeTool === 'ai'}
            onClick={() => onChangeActiveTool('ai')}
          />
        </li>
        <li>
          <SideBarItem
            icon={Settings}
            label='Settings'
            isActive={activeTool === 'settings'}
            onClick={() => onChangeActiveTool('settings')}
          />
        </li>
      </ul>
    </aside>
  );
};
