(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('p5'), require('tone.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'p5', 'tone.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ToneVisualizer = {}, global.p5, global.Tone));
})(this, (function (exports, p5, Tone) { 'use strict';

  function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n.default = e;
    return Object.freeze(n);
  }

  var Tone__namespace = /*#__PURE__*/_interopNamespaceDefault(Tone);

  // Classe ToneVisualizer
  class ToneVisualizer {
    constructor(element, audioSource, config = {}) {
      // Récupération de l'élément via querySelector
      this.element = typeof element === 'string' 
        ? document.querySelector(element)
        : element;

      if (!this.element) {
        throw new Error(`Element "${element}" not found`);
      }

      // Configuration par défaut (100% de l'élément parent)
      const {
        width = this.element.offsetWidth || this.element.clientWidth || 1000,
        height = this.element.offsetHeight || this.element.clientHeight || 150,
        type = 'fft',
        fftSize = 1024,
        waveformSize = 512,
        fillColor = [0, 255, 255, 200],
        strokeColor = [0, 255, 255],
        strokeWeight = 2
      } = config;
      
      this.audioSource = audioSource;
      this.width = width;
      this.height = height;
      this.type = type;
      this.fillColor = fillColor;
      this.strokeColor = strokeColor;
      this.strokeWeight = strokeWeight;
      this.started = false;

      // Initialisation des analyseurs
      this.fftAnalyzer = new Tone__namespace.FFT(fftSize);
      this.waveform = new Tone__namespace.Waveform(waveformSize);

      // Connexion de la source audio aux analyseurs
      this.audioSource.connect(this.fftAnalyzer).connect(this.waveform);

      // Gestion du resize
      this._setupResizeObserver();

      // Initialisation du canvas p5
      this._initP5();
    }

    _setupResizeObserver() {
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => {
          const newWidth = this.element.offsetWidth || this.element.clientWidth;
          const newHeight = this.element.offsetHeight || this.element.clientHeight;
          
          if (newWidth !== this.width || newHeight !== this.height) {
            this.width = newWidth;
            this.height = newHeight;
            if (this.p5Instance) {
              this.p5Instance.resizeCanvas(newWidth, newHeight);
            }
          }
        });
        this.resizeObserver.observe(this.element);
      }
    }

    _initP5() {
      this.p5Instance = new p5((p) => {
        p.setup = () => {
          const canvas = p.createCanvas(this.width, this.height);
          canvas.parent(this.element.id || this.element);
          canvas.elt.style.background = "transparent";
        };

        p.draw = () => {
          p.clear();

          if (!this.started) return;

          if (this.type === 'fft') {
            this._drawFFT(p);
          } else if (this.type === 'oscilloscope') {
            this._drawOscilloscope(p);
          }
        };
      }, this.element.id || this.element);
    }

    _drawFFT(p) {
      p.noStroke();
      p.fill(...this.fillColor);

      const spectrum = this.fftAnalyzer.getValue();
      const len = spectrum.length;
      const bw = p.width / len;

      for (let i = 0; i < len; i++) {
        const db = spectrum[i];
        const h = p.map(db, -140, 0, 0, p.height);
        p.rect(i * bw, p.height - h, bw + 1, h);
      }
    }

    _drawOscilloscope(p) {
      p.noFill();
      p.strokeWeight(this.strokeWeight);
      p.stroke(...this.strokeColor);

      const values = this.waveform.getValue();
      p.beginShape();
      for (let i = 0; i < values.length; i++) {
        const x = p.map(i, 0, values.length, 0, p.width);
        const y = p.map(values[i], -1, 1, 0, p.height);
        p.vertex(x, y);
      }
      p.endShape();
    }

    start() {
      this.started = true;
    }

    stop() {
      this.started = false;
    }

    setType(type) {
      this.type = type;
    }

    setFillColor(color) {
      this.fillColor = color;
    }

    setStrokeColor(color) {
      this.strokeColor = color;
    }

    setStrokeWeight(weight) {
      this.strokeWeight = weight;
    }

    destroy() {
      this.stop();
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      if (this.p5Instance) {
        this.p5Instance.remove();
      }
      this.audioSource.disconnect(this.fftAnalyzer);
      this.audioSource.disconnect(this.waveform);
    }
  }

  exports.ToneVisualizer = ToneVisualizer;

}));
//# sourceMappingURL=visualizer.umd.js.map
