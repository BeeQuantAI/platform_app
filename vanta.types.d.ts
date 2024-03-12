declare module 'vanta/dist/vanta.fog.min';
declare module 'vanta/dist/vanta.net.min';
declare module 'vanta/dist/vanta.dots.min';
declare module 'vanta/src/vanta.fog.js';

export interface FogParams {
  el: string;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  xOffset?: number;
  yOffset?: number;
  size?: number;
  backgroundColor?: string;
}

export interface FogInstance {
  setOptions: ({
    el,
    mouseControls,
    touchControls,
    gyroControls,
    minHeight,
    minWidth,
    size,
    xOffset,
    yOffset,
    backgroundColor,
  }: Omit<FogParams, 'el'>) => void;
  resize: () => void;
  destroy: () => void;
}

declare global {
  interface Window {
    VANTA: {
      FOG: ({
        el,
        mouseControls,
        touchControls,
        gyroControls,
        minHeight,
        minWidth,
        size,
        xOffset,
        yOffset,
        backgroundColor,
      }: FogParams) => FogInstance;
    };
  }
}
