import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/visualizer.js',
  output: [
    {
      file: 'dist/visualizer.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/visualizer.umd.js',
      format: 'umd',
      name: 'ToneVisualizer',
      sourcemap: true,
      globals: {
        'p5': 'p5',
        'tone.js': 'Tone'
      }
    }
  ],
  external: ['p5', 'tone.js'],
  plugins: [
    resolve()
  ]
};
