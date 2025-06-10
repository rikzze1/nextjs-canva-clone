import { fabric } from 'fabric';
import { useCallback, useRef } from 'react';

interface UseClipboardProps {
  canvas: fabric.Canvas | null;
}

export const useClipboard = ({ canvas }: UseClipboardProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clipboard = useRef<any>(null);

  const copy = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    canvas?.getActiveObject()?.clone((cloned: any) => {
      clipboard.current = cloned;
    });
  }, [canvas]);

  const paste = useCallback(() => {
    if (!clipboard.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clipboard.current.clone((clonedObj: any) => {
      canvas?.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });

      if (clonedObj.type === 'activeSelection') {
        clonedObj.canvas = canvas;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        clonedObj.forEachObject((obj: any) => {
          canvas?.add(obj);
        });
        clonedObj.setCoords();
      } else {
        canvas?.add(clonedObj);
      }
      clipboard.current.top += 10;
      clipboard.current.left += 10;
      canvas?.setActiveObject(clonedObj);
      canvas?.requestRenderAll();
    });
  }, [canvas]);

  return { copy, paste };
};
