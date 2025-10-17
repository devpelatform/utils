import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { BookOpenText } from 'lucide-react';

import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      themeSwitch={{
        mode: 'light-dark-system',
      }}
      links={[]}
      githubUrl="https://github.com/devpelatform/package-template"
      nav={{
        title: (
          <div className="flex flex-row items-center gap-2">
            <BookOpenText />
            <span className="font-semibold text-lg text-mono">Template</span>
          </div>
        ),
      }}
      tabMode="navbar"
    >
      {children}
    </DocsLayout>
  );
}
