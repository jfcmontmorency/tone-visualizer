declare module 'tone-visualizer' {
  import * as Tone from 'tone';

  export interface ToneVisualizerConfig {
    /**
     * Canvas width in pixels (default: 100% of element)
     */
    width?: number;
    
    /**
     * Canvas height in pixels (default: 100% of element)
     */
    height?: number;
    
    /**
     * Visualization type: 'fft' for frequency spectrum or 'oscilloscope' for waveform
     * @default 'fft'
     */
    type?: 'fft' | 'oscilloscope';
    
    /**
     * FFT analyzer size
     * @default 1024
     */
    fftSize?: number;
    
    /**
     * Waveform analyzer size
     * @default 512
     */
    waveformSize?: number;
    
    /**
     * Fill color for FFT visualization [R, G, B] or [R, G, B, A]
     * @default [0, 255, 255, 200]
     */
    fillColor?: [number, number, number] | [number, number, number, number];
    
    /**
     * Stroke color for oscilloscope [R, G, B] or [R, G, B, A]
     * @default [0, 255, 255]
     */
    strokeColor?: [number, number, number] | [number, number, number, number];
    
    /**
     * Line thickness for oscilloscope
     * @default 2
     */
    strokeWeight?: number;
  }

  export class ToneVisualizer {
    /**
     * Create a new audio visualizer
     * @param element - querySelector string or DOM element where the canvas will be created
     * @param audioSource - Any Tone.js audio source (synth, player, sampler, etc.)
     * @param config - Optional configuration object
     */
    constructor(
      element: string | HTMLElement,
      audioSource: Tone.ToneAudioNode,
      config?: ToneVisualizerConfig
    );

    /**
     * Start the visualization
     */
    start(): void;

    /**
     * Stop the visualization
     */
    stop(): void;

    /**
     * Change visualization type
     * @param type - 'fft' for frequency spectrum or 'oscilloscope' for waveform
     */
    setType(type: 'fft' | 'oscilloscope'): void;

    /**
     * Change fill color for FFT visualization
     * @param color - RGB or RGBA array [R, G, B] or [R, G, B, A]
     */
    setFillColor(color: [number, number, number] | [number, number, number, number]): void;

    /**
     * Change stroke color for oscilloscope
     * @param color - RGB or RGBA array [R, G, B] or [R, G, B, A]
     */
    setStrokeColor(color: [number, number, number] | [number, number, number, number]): void;

    /**
     * Change line thickness
     * @param weight - Line thickness in pixels
     */
    setStrokeWeight(weight: number): void;

    /**
     * Destroy the visualizer and clean up resources
     */
    destroy(): void;
  }
}
