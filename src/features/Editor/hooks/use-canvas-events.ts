import { useEffect } from 'react';
import { fabric } from 'fabric';

interface UseCanvasEventsProps {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
  autoZoom?: () => void;
}

export const useCanvasEvents = ({
  save,
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
  autoZoom,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on('object:added', () => save());
      canvas.on('object:removed', () => save());
      canvas.on('object:modified', () => save());
      canvas.on('selection:created', e => {
        console.log('selection:created');
        setSelectedObjects(e.selected || []);
        // Trigger auto-resize after a small delay to account for toolbar appearing
        setTimeout(() => autoZoom?.(), 100);
      });
      canvas.on('selection:updated', e => {
        console.log('selection:updated');
        setSelectedObjects(e.selected || []);
        setTimeout(() => autoZoom?.(), 100);
      });
      canvas.on('selection:cleared', () => {
        console.log('selection:cleared');
        setSelectedObjects([]);
        clearSelectionCallback?.();
        // Trigger auto-resize after a small delay to account for toolbar disappearing
        setTimeout(() => autoZoom?.(), 100);
      });
    }

    return () => {
      if (canvas) {
        canvas?.off('object:added');
        canvas?.off('object:removed');
        canvas?.off('object:modified');
        canvas?.off('selection:created');
        canvas?.off('selection:updated');
        canvas?.off('selection:cleared');
      }
    };
  }, [canvas, setSelectedObjects, clearSelectionCallback, save, autoZoom]);
};
