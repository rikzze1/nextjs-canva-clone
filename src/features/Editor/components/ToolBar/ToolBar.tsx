import React, { useState } from 'react'
import { ActiveTool, Editor } from '@/features/Editor/types';
import { Hint } from '@/components/Hint/Hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ToolbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ToolBar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: ToolbarProps) => {
    const selectedObject = editor?.canvas.getActiveObject();

    const getProperty = (property: any) => {
        if (!selectedObject) return null;
        return selectedObject.get(property);
    }

    const fillColor = getProperty("fill");
    const fillColor2 = editor?.fillColor;

    const [properties, setProperties] = useState({
        fillColor,
    })


    return (
        <div className="shrink-0 h-[56px] border-b border-gray-200 bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
            <div className="flex items-center h-full justify-center">
                <Hint label="Color" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("fill")}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            "cursor-pointer",
                            activeTool === "fill" && "bg-gray-100"
                        )}
                        style={{
                            backgroundColor: typeof fillColor === "string" ? fillColor : "black"
                        }}
                    >
                        <div className="rounded-sm size-2 border" />
                    </Button>
                </Hint>
            </div>
        </div>
    )
}
