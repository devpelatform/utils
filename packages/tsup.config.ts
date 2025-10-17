import { defineConfig } from 'tsup';

export default defineConfig(() => {
  return {
    entry: ['src/index.ts', 'src/server.ts'],
    format: ['esm', 'cjs'],
    splitting: true,
    cjsInterop: true,
    skipNodeModulesBundle: true,
    treeshake: false,
    metafile: true,
  };
});
