import typescript from '@rollup/plugin-typescript';
import { wasm } from '@rollup/plugin-wasm';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    wasm({
      targetEnv: 'auto'
    }),
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extensions: ['.css'],
      minimize: true,
      inject: {
        insertAt: 'top',
      },
    }),
    nodeResolve(),
    commonjs()
  ],
  external: ['cyan-wasm', 'react', 'react-dom', 'framer-motion']
}; 