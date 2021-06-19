import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import builtins from 'rollup-plugin-node-builtins'
const minificationPlugins =  [terser({
  module: true,
  compress: {
    hoist_vars: true,
    module: true,
    passes: 1,
    pure_getters: true,
    unsafe_comps: true,
    unsafe_undefined: true
  },
  mangle: {
    toplevel: true
  }
})]

const plugins = [
  builtins(),
  nodeResolve({
    mainFields: ['main']
  }),
  commonjs(),
  ...minificationPlugins
]

export default [{
  input: 'lib/index.js',
  output: [{
    name: 'Mortice',
    file: 'dist/mortice.js',
    format: 'umd',
    exports: 'named',
    sourcemap: true,
  }],
  plugins
}]