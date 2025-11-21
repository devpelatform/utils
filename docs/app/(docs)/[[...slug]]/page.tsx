import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import {
  PageArticle,
  PageBreadcrumb,
  PageFooter,
  PageLastUpdate,
  PageRoot,
  PageTOC,
  PageTOCItems,
  PageTOCPopover,
  PageTOCPopoverContent,
  PageTOCPopoverItems,
  PageTOCPopoverTrigger,
  PageTOCTitle,
} from 'fumadocs-ui/layouts/docs/page';
import defaultMdxComponents from 'fumadocs-ui/mdx';

import { getPageImage, source } from '@/lib/source';

export default async function Page(props: PageProps<'/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const toc = page.data.toc;
  const lastModified = page.data.lastModified;

  // return (
  //   <DocsPage full={page.data.full} toc={page.data.toc}>
  //     <DocsTitle>{page.data.title}</DocsTitle>
  //     <DocsDescription>{page.data.description}</DocsDescription>
  //     <DocsBody>
  //       <MDX
  //         components={{
  //           Tab,
  //           Tabs,
  //           ...defaultMdxComponents,
  //         }}
  //       />
  //     </DocsBody>
  //   </DocsPage>
  // )
  return (
    <PageRoot
      toc={{
        toc,
        single: false,
      }}
    >
      {toc.length > 0 && (
        <PageTOCPopover>
          <PageTOCPopoverTrigger />
          <PageTOCPopoverContent>
            <PageTOCPopoverItems />
          </PageTOCPopoverContent>
        </PageTOCPopover>
      )}
      <PageArticle>
        <PageBreadcrumb />
        <h1 className="font-semibold text-3xl">{page.data.title}</h1>
        <p className="border-b pb-6 text-fd-muted-foreground text-lg">{page.data.description}</p>
        {/* <div className="flex flex-row items-center gap-2 pt-2 pb-6 border-b">
          <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
          <ViewOptions
            markdownUrl={`${page.url}.mdx`}
            // githubUrl={`https://github.com/${owner}/${repo}/blob/dev/apps/docs/content/docs/${page.path}`}
          />
        </div> */}
        <div className="prose flex-1 text-fd-foreground/80">
          <MDX
            components={{
              Tab,
              Tabs,
              ...defaultMdxComponents,
            }}
          />
          {/* <Mdx components={useMDXComponents()} /> */}
          {/* {page.data.index ? <DocsCategory url={page.url} /> : null} */}
        </div>
        {/* <Rate onRateAction={onRateAction} /> */}
        {lastModified && <PageLastUpdate date={lastModified} />}
        <PageFooter />
      </PageArticle>
      <PageTOC>
        {toc.length > 0 && (
          <>
            <PageTOCTitle />
            <PageTOCItems variant="clerk" />
            <div className="mt-4 w-full border border-t border-dashed" />
          </>
        )}
      </PageTOC>
    </PageRoot>
  );
}

// function DocsCategory({ url }: { url: string }) {
//   return (
//     <Cards>
//       {getPageTreePeers(source.pageTree, url).map((peer) => (
//         <Card key={peer.url} title={peer.name} href={peer.url}>
//           {peer.description}
//         </Card>
//       ))}
//     </Cards>
//   )
// }

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
