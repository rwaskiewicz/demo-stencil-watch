import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'site/index.js',
  output: {
    inlineDynamicImports: true,
    file: "site/bundle.js",
    format: 'es'
  },
  plugins: [nodeResolve({dedupe: ['@stencil/core']})],
};
