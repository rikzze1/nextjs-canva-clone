import { fabric } from 'fabric';
import { ITextboxOptions } from 'fabric/fabric-impl';

export type FontStyle = 'normal' | 'italic' | 'oblique';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export const JSON_KEYS = [
  'name',
  'grandientAngle',
  'selectable',
  'hasControls',
  'linkData',
  'editable',
  'extensionType',
  'extension',
];

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
  | 'templates';

export interface EditorHookProps {
  defaultState?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  clearSelectionCallback?: () => void;
  saveCallback?: (values: { json: string; height: number; width: number }) => void;
}

export type BuildEditorProps = {
  onUndo: () => void;
  onRedo: () => void;
  canRedo: () => boolean;
  canUndo: () => boolean;
  undo: () => void;
  redo: () => void;
  save: (skip?: boolean) => void;
  copy: () => void;
  paste: () => void;
  autoZoom: () => void;
  canvas: fabric.Canvas;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  selectedObjects: fabric.Object[];
  strokeDashArray: number[];
  fontFamily: string;
  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
  setStrokeDashArray: (value: number[]) => void;
  setFontFamily: (value: string) => void;
};
export interface Editor {
  savePNG: () => void;
  saveJPG: () => void;
  saveSVG: () => void;
  saveJSON: () => void;
  loadJSON: (json: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canRedo: () => boolean;
  canUndo: () => boolean;
  autoZoom: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  getWorkspace: () => fabric.Object | undefined;
  changeBackground: (value: string) => void;
  changeSize: (value: { width: number; height: number }) => void;
  enableDrawingMode: () => void;
  disableDrawingMode: () => void;
  onCopy: () => void;
  onPaste: () => void;
  changeImageFilter: (image: string) => void;
  addImage: (value: string) => void;
  delete: () => void;
  addText: (value: string, options?: ITextboxOptions) => void;
  getActiveFontSize: () => number;
  changeFontSize: (value: number) => void;
  getActiveTextAlign: () => TextAlign;
  changeTextAlign: (value: TextAlign) => void;
  getActiveFontWeight: () => number;
  changeFontWeight: (value: number) => void;
  getActiveFontUnderline: () => boolean;
  changeFontUnderline: (value: boolean) => void;
  getActiveFontLinethrough: () => boolean;
  changeFontLinethrough: (value: boolean) => void;
  getActiveOpacity: () => number;
  changeFontFamily: (value: string) => void;
  getActiveFontFamily: () => string;
  changeFontStyle: (value: FontStyle) => void;
  getActiveFontStyle: () => FontStyle;
  changeFillColor: (value: string) => void;
  getActiveFillColor: () => string;
  changeStrokeWidth: (value: number) => void;
  getActiveStrokeWidth: () => number;
  changeStrokeColor: (value: string) => void;
  getActiveStrokeColor: () => string;
  changeStrokeDashArray: (value: number[]) => void;
  getActiveStrokeDashArray: () => number[];
  changeOpacity: (value: number) => void;
  bringForward: () => void;
  sendBackwards: () => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
}
