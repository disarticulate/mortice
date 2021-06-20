const pkg = require('./package.json')
import externalGlobals from "rollup-plugin-external-globals"
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

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
  nodeResolve({
    browser: true,
    preferBuiltins: false,
    mainFields: ['main']
  }),
  commonjs(),
  externalGlobals({
    crypto: "crypto"
  }),
  ...minificationPlugins
]

export default [{
  input: 'lib/index.js',
  output: [{
    name: 'Mortice',
    file: `dist/mortice.${pkg.version}.min.js`,
    format: 'umd',
    exports: 'named',
    sourcemap: true,
  }],
  external: ['crypto'],
  plugins
}]