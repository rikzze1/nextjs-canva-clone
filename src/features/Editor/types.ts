import { fabric } from 'fabric'

export type ActiveTool =
    | 'select'
    | 'shapes'
    | 'text'
    | 'images'
    | 'draw'
    | 'fill'
    | 'stroke-color'
    | 'stroke-width'
    | 'font'
    | 'opacity'
    | 'filter'
    | 'settings'
    | 'ai'
    | 'remove-bg'
    | 'templates'

export type BuildEditorProps = {
    canvas: fabric.Canvas
    fillColor: string
    strokeColor: string
    strokeWidth: number
    setFillColor: (value: string) => void
    setStrokeColor: (value: string) => void
    setStrokeWidth: (value: number) => void
}
export interface Editor {
    changeFillColor: (value: string) => void;
    changeStrokeWidth: (value: number) => void;
    changeStrokeColor: (value: string) => void;
    addCircle: () => void
    addSoftRectangle: () => void
    addRectangle: () => void
    addTriangle: () => void
    addInverseTriangle: () => void
    addDiamond: () => void,
    canvas: fabric.Canvas;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
}
