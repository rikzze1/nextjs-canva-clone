'use client'

import { fabric } from 'fabric'
import { EditorVariants, variants } from './Editor.variance'
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

import { NavBar } from '@/features/Editor/components/NavBar/NavBar'
import { SideBar } from '@/features/Editor/components/SideBar/SideBar'
import { ToolBar } from '@/features/Editor/components/ToolBar/ToolBar'
import { Footer } from '@/features/Editor/components/Footer/Footer'
import { ShapeSideBar } from '@/features/Editor/components/SideBar/ShapeSideBar'
import { useEditor } from '@/features/Editor/hooks/use-editor'
import { ActiveTool } from '@/features/Editor/types'
import { FillColorSidebar } from '@/features/Editor/components/SideBar/SideBarFillColor'

type EditorProps = ComponentProps<'canvas'> & EditorVariants

export const Editor = ({ variant, ...props }: EditorProps) => {
    const [activeTool, setActiveTool] = useState<ActiveTool>('select')

    const onChangeActiveTool = useCallback(
        (tool: ActiveTool) => {
            if (tool === activeTool) {
                return setActiveTool('select')
            }
            if (tool === 'draw') {
                //TODO: Enable draw mow
            }
            if (activeTool === 'draw') {
                //TODO: Disable draw mode
            }

            setActiveTool(tool)
        },
        [activeTool]
    )

    const { init, editor } = useEditor()

    const canvasRef = useRef(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) {
            return
        }

        const canvas = new fabric.Canvas(canvasRef.current, {
            controlsAboveOverlay: true,
            preserveObjectStacking: true,
        })

        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current,
        })

        return () => {
            canvas.dispose()
        }
    }, [init])

    return (
        <div
            className={clsx(variants({ variant }), 'bg-muted')}
            ref={containerRef}
        >
            <NavBar
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
            />
            <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
                <SideBar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <ShapeSideBar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FillColorSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <main
                    className="bg-muted flex-1 overflow-auto relative flex flex-col"
                    tabIndex={0}
                >
                    <ToolBar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                    />
                    <div className="flex-1 flex items-center justify-center">
                        <canvas ref={canvasRef} {...props} />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    )
}
