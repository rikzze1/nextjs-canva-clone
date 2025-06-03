'use client'

import { SideBarItem } from '@/features/Editor/components/SideBar/SideBarItem'
import {
    LayoutTemplate,
    ImageIcon,
    Settings,
    Shapes,
    Sparkles,
    Type,
} from 'lucide-react'
import { ActiveTool } from '@/features/Editor/types'

interface SidebarProps {
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
}

export const SideBar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
    return (
        <aside className="bg-white flex flex-col w-[100px] h-full border-r border-gray-200 overflow-y-auto">
            <ul className="flex flex-col">
                <SideBarItem
                    icon={LayoutTemplate}
                    label="Design"
                    isActive={activeTool === 'templates'}
                    onClick={() => onChangeActiveTool('templates')}
                />
                <SideBarItem
                    icon={ImageIcon}
                    label="Image"
                    isActive={activeTool === 'images'}
                    onClick={() => onChangeActiveTool('images')}
                />
                <SideBarItem
                    icon={Type}
                    label="Text"
                    isActive={activeTool === 'text'}
                    onClick={() => onChangeActiveTool('text')}
                />
                <SideBarItem
                    icon={Shapes}
                    label="Shapes"
                    isActive={activeTool === 'shapes'}
                    onClick={() => onChangeActiveTool('shapes')}
                />
                <SideBarItem
                    icon={Sparkles}
                    label="AI"
                    isActive={activeTool === 'ai'}
                    onClick={() => onChangeActiveTool('ai')}
                />
                <SideBarItem
                    icon={Settings}
                    label="Settings"
                    isActive={activeTool === 'settings'}
                    onClick={() => onChangeActiveTool('settings')}
                />
            </ul>
        </aside>
    )
}
