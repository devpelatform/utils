import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { createMDXSource } from 'fumadocs-mdx';

import { docs, meta } from '@/.source';

export const source = loader({
  baseUrl: '/',
  plugins: [lucideIconsPlugin()],
  source: createMDXSource(docs, meta),
});
