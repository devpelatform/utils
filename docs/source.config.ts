import { remarkHeading, remarkImage, remarkNpm } from 'fumadocs-core/mdx-plugins';
import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';

export const docs = defineDocs({
  dir: 'content',
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  plugins: [lastModified()],
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
