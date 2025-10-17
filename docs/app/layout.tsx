import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider';

import SearchDialog from '@/components/search';

import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          search={{
            SearchDialog,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
