'use client'

import { ActiveTool, Editor } from '@/features/Editor/types'
import { cn } from '@/lib/utils'

import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ToolSideBarHeader } from '@/features/Editor/components/ToolBar/ToolSideBarHeader'
import { ToolSideBarClose } from '@/features/Editor/components/ToolBar/ToolSideBarClose'
import { ColorPicker } from '@/features/Editor/components/ColorPicker/ColorPicker'
import { FILL_COLOR } from '../../constants'

interface FillColorProps {
    editor: Editor | undefined
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
}

export const FillColorSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: FillColorProps) => {
    const value = editor?.fillColor || FILL_COLOR

    const onClose = () => {
        onChangeActiveTool('select')
    }

    const onChange = (value: string) => {
        editor?.changeFillColor(value)
    }

    return (
        <aside
            className={cn(
                'bg-white relative border-r border-gray-200 z-[40] w-[360px] h-full flex flex-col',
                activeTool === 'fill' ? 'visible' : 'hidden'
            )}
        >
            <ToolSideBarHeader
                title="Fill color"
                description="Add fill color to your element"
            />
            <ScrollArea>
                <div className="p-4 space-y-6">
                    <ColorPicker value={value} onChange={onChange} />
                </div>
            </ScrollArea>
            <ToolSideBarClose onClick={onClose} />
        </aside>
    )
}
