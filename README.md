# tone-visualizer

Simple and customizable audio visualizer for [Tone.js](https://tonejs.github.io/) with [p5.js](https://p5js.org/).

## Installation

```bash
npm install tone-visualizer p5 tone
```

## Quick Start

```javascript
import * as Tone from 'tone';
import { ToneVisualizer } from 'tone-visualizer';

// Create an audio source
const synth = new Tone.FMSynth().toDestination();

// Create a visualizer
const visualizer = new ToneVisualizer('#canvas-container', synth, {
  type: 'oscilloscope',
  strokeColor: [0, 255, 255],
  strokeWeight: 2
});

// Start visualization
await Tone.start();
visualizer.start();

// Play some sound
synth.triggerAttackRelease("C3", "4n");
```

## API

### Constructor

```javascript
new ToneVisualizer(element, audioSource, config)
```

**Parameters:**

- `element` (string | HTMLElement) - querySelector string or DOM element where the canvas will be created
- `audioSource` (Tone.ToneAudioNode) - Any Tone.js audio source (synth, player, sampler, etc.)
- `config` (Object) - Optional configuration object

**Config Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | number | 100% of element | Canvas width in pixels |
| `height` | number | 100% of element | Canvas height in pixels |
| `type` | string | `'fft'` | Visualization type: `'fft'` or `'oscilloscope'` |
| `fftSize` | number | `1024` | FFT analyzer size |
| `waveformSize` | number | `512` | Waveform analyzer size |
| `fillColor` | Array | `[0, 255, 255, 200]` | Fill color for FFT (RGBA) |
| `strokeColor` | Array | `[0, 255, 255]` | Stroke color for oscilloscope (RGB/RGBA) |
| `strokeWeight` | number | `2` | Line thickness for oscilloscope |

### Methods

#### `start()`
Start the visualization.

```javascript
visualizer.start();
```

#### `stop()`
Stop the visualization.

```javascript
visualizer.stop();
```

#### `setType(type)`
Change visualization type.

```javascript
visualizer.setType('fft');        // Frequency spectrum
visualizer.setType('oscilloscope'); // Waveform
```

#### `setFillColor(color)`
Change fill color for FFT visualization.

```javascript
visualizer.setFillColor([255, 0, 0, 150]); // Red semi-transparent
```

#### `setStrokeColor(color)`
Change stroke color for oscilloscope.

```javascript
visualizer.setStrokeColor([0, 255, 0]); // Green
```

#### `setStrokeWeight(weight)`
Change line thickness.

```javascript
visualizer.setStrokeWeight(5);
```

## Examples

### FFT Visualizer

```javascript
import * as Tone from 'tone';
import { ToneVisualizer } from 'tone-visualizer';

const player = new Tone.Player({
  url: "audio.mp3",
  loop: true
}).toDestination();

const visualizer = new ToneVisualizer('#visualizer', player, {
  type: 'fft',
  fillColor: [255, 100, 0, 200],
  height: 200
});

await Tone.start();
visualizer.start();
player.start();
```

### Oscilloscope with Synth

```javascript
import * as Tone from 'tone';
import { ToneVisualizer } from 'tone-visualizer';

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

const visualizer = new ToneVisualizer('#visualizer', synth, {
  type: 'oscilloscope',
  strokeColor: [0, 255, 255],
  strokeWeight: 3
});

await Tone.start();
visualizer.start();

// Play notes
synth.triggerAttackRelease(["C4", "E4", "G4"], "2n");
```

### Dynamic Type Switching

```javascript
const visualizer = new ToneVisualizer('#visualizer', synth);

visualizer.start();

// Switch to oscilloscope after 3 seconds
setTimeout(() => {
  visualizer.setType('oscilloscope');
}, 3000);
```

## HTML Setup

Make sure you have a container element in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    #visualizer {
      width: 100%;
      height: 200px;
      background: #000;
    }
  </style>
</head>
<body>
  <div id="visualizer"></div>
  <script type="module" src="main.js"></script>
</body>
</html>
```

## Browser Support

Requires ES6+ support and WebGL. Works in all modern browsers.

## License

MIT © jf
