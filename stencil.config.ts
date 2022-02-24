import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'demo-stencil-watch',
  outputTargets: [
    {
      type: 'dist-custom-elements',
      // autoDefineCustomElements: true,
    },
  ],
};
