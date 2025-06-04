'use client'

import { ActiveTool, Editor } from '@/features/Editor/types'
import { cn } from '@/lib/utils'

import { Circle, Diamond, Square, Squircle, Triangle } from 'lucide-react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader'
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose'
import { ToolShape } from '@/features/Editor/components/ToolBar/ToolShape'

interface ShapeSideBarProps {
    editor: Editor | undefined
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
}

export const ShapeSideBar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: ShapeSideBarProps) => {
    const onClose = () => {
        onChangeActiveTool('select')
    }

    return (
        <aside
            className={cn(
                'bg-white relative border-r border-gray-200 z-[40] w-[360px] h-full flex flex-col',
                activeTool === 'shapes' ? 'visible' : 'hidden'
            )}
        >
            <ToolSideBarHeader
                title="Shapes"
                description="Add shapes to your canvas"
            />
            <ScrollArea>
                <div className="grid grid-cols-3 gap-4 p-4">
                    <ToolShape
                        onClick={() => editor?.addCircle()}
                        icon={Circle}
                    />
                    <ToolShape
                        onClick={() => editor?.addRectangle()}
                        icon={Square}
                    />
                    <ToolShape
                        onClick={() => editor?.addSoftRectangle()}
                        icon={Squircle}
                    />
                    <ToolShape
                        onClick={() => editor?.addTriangle()}
                        icon={Triangle}
                    />
                    <ToolShape
                        onClick={() => editor?.addInverseTriangle()}
                        icon={Triangle}
                        iconClassName="rotate-180"
                    />
                    <ToolShape
                        onClick={() => editor?.addDiamond()}
                        icon={Diamond}
                    />
                </div>
            </ScrollArea>
            <ToolSideBarClose onClick={onClose} />
        </aside>
    )
}
