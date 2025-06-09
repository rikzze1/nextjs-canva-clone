'use client';

import clsx from 'clsx';
import { fabric } from 'fabric';
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { SELECTION_DEPENT_TOOLS } from '@/features/Editor/constants';
import { ActiveTool } from '@/features/Editor/types';
import { useEditor } from '@/features/Editor/hooks/use-editor';

import { EditorVariants, variants } from '@/features/Editor/components/Editor.variance';
// import { Footer } from '@/features/Editor/components/Footer/Footer';
import { NavBar } from '@/features/Editor/components/NavBar/NavBar';
import { ShapeSideBar } from '@/features/Editor/components/SideBar/tools/ShapeSideBar';
import { TextSidebar } from '@/features/Editor/components/SideBar/tools/SideBarText';
import { SideBar } from '@/features/Editor/components/SideBar/SideBar';
import { FillColorSidebar } from '@/features/Editor/components/SideBar/tools/SideBarFillColor';
import { StrokeColorSidebar } from '@/features/Editor/components/SideBar/tools/SideBarStrokeColor';
import { StrokeWidthSidebar } from '@/features/Editor/components/SideBar/tools/SideBarStrokeWidth';
import { FontSidebar } from '@/features/Editor/components/SideBar/tools/SideBarFont';
import { ImageSidebar } from '@/features/Editor/components/SideBar/tools/SideBarImage';
import { FilterSidebar } from '@/features/Editor/components/SideBar/tools/SideBarFilter';
import { OpacitySidebar } from '@/features/Editor/components/SideBar/tools/SideBarOpacity';
import { ToolBar } from '@/features/Editor/components/ToolBar/ToolBar';

type EditorProps = ComponentProps<'canvas'> & EditorVariants;

export const Editor = ({ variant, ...props }: EditorProps) => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select');

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool('select');
      }
      if (tool === 'draw') {
        //TODO: Enable draw mow
      }
      if (activeTool === 'draw') {
        //TODO: Disable draw mode
      }

      setActiveTool(tool);
    },
    [activeTool]
  );

  const onClearSelection = useCallback(() => {
    if (SELECTION_DEPENT_TOOLS.includes(activeTool)) {
      setActiveTool('select');
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  });

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) {
      return;
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current,
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className={clsx(variants({ variant }), 'bg-muted')} ref={containerRef}>
      <NavBar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className='absolute h-[calc(100%-68px)] w-full top-[68px] flex'>
        <SideBar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
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
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FontSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ImageSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FilterSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className='bg-muted flex-1 overflow-auto relative flex flex-col' tabIndex={0}>
          <ToolBar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
          />
          <div className='flex-1 flex items-center justify-center'>
            <canvas ref={canvasRef} {...props} />
          </div>
          {/* <Footer /> */}
        </main>
      </div>
    </div>
  );
};
