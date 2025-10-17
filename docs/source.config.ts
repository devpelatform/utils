import { remarkHeading, remarkImage, remarkNpm } from 'fumadocs-core/mdx-plugins';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
  dir: 'content',
});

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    rehypeCodeOptions: {
      inline: 'tailing-curly-colon',
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      langs: ['ts', 'tsx', 'js', 'jsx', 'json', 'css', 'html', 'md', 'mdx'],
      defaultLanguage: 'tsx',
    },
    remarkPlugins: [[remarkHeading, { generateToc: true }], remarkImage, remarkNpm],
  },
});
