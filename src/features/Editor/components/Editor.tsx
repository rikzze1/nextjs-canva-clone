'use client'

import { fabric } from 'fabric'
import { EditorVariants, variants } from './Editor.variance'
import { ComponentProps, useEffect, useRef } from 'react'
import clsx from 'clsx'

import { NavBar } from '@/features/Editor/components/NavBar/NavBar'
import { SideBar } from '@/features/Editor/components/SideBar/SideBar'
import { ToolBar } from '@/features/Editor/components/ToolBar/ToolBar'
import { Footer } from '@/features/Editor/components/Footer/Footer'
import { useEditor } from '@/features/Editor/hooks/use-editor'

type EditorProps = ComponentProps<'canvas'> & EditorVariants

export const Editor = ({ variant, ...props }: EditorProps) => {
    const { init } = useEditor()

    const canvasRef = useRef(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            controlsAboveOverlay: true,
            preserveObjectStacking: true,
        })

        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current!,
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
            <NavBar />
            <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
                <SideBar />
                <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
                    <ToolBar />
                    <div className="flex-1 flex items-center justify-center">
                        <canvas ref={canvasRef} {...props} />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    )
}
