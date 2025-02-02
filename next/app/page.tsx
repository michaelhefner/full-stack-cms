import { GetBasicPages, GetBasicPageNavigation } from "../prisma/basic-pages/get";
import type { DocumentRendererProps } from '@keystone-6/document-renderer'
import { GetNavigation } from "@/prisma/navigation/get";

import { CustomRenderer } from './components/CustomRenderer/CustomRenderer'
import Image from "next/image";
import { GetStatus } from "@/prisma/statuses/get";
const renderers: DocumentRendererProps['renderers'] = {
  block: {
    heading({ level, children, textAlign }) {
      const Comp = `h${level}` as const
      return <Comp style={{ textAlign }}>{children}</Comp>
    },
  },
  image: ({ src, alt }) => {
    return <Image src={src} alt={alt} />
  }
}

type BasicPageObj = {
  id: string;
  title: string;
  status: string;
  url: string;
}


export default async function Page({ params }: { params: { url: string } }) {
  const { url } = await params;
  console.log('params', params);
  const navigation = await GetNavigation({
    where: {
      url: `/${url || ''}`
    }
  });
  if (!navigation || navigation.length === 0) {
    console.error('Navigation not found');
    return <div>Navigation not found</div>;
  }
  // console.log('navigation', navigation[0].id);
  const page = await GetBasicPages(navigation[0].id);
  console.log('page', page);
  // const status = page && page.status ? await GetStatus(page.status) : null;
  // console.log(status);
  return (
    <div>
            {page && page.status?.status === 'published' && (
              <div key={page.id}>
                { page['content'] && page['content'].length ? page['content'].map(content => {
                // if (content.status !== 'published') return null;
                return (
                  <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                  }} key={content.id}>
                    <CustomRenderer document={JSON.parse(content.content)} renderers={renderers} />
                    </div>
                )
              }) : null}
              </div>
            )}
    </div>
  );
}

export const generateStaticParams = async () => {
  const basicPages = await GetBasicPageNavigation();
  if (!basicPages || basicPages.length === 0) return [] as BasicPageObj[];
  console.log('basicPages in static ', basicPages);
  return basicPages.map((page): { params: { url: string } } => {
    const navigationURL: string | null = page.navigation ? page.navigation.url : null;
    console.log('navigation', navigationURL);
    return {
      params: {
        url: navigationURL || ''
      }
    }
  });
}