import Link from "next/link";
import { GetBasicPages, GetBasicPageNavigation } from "../../prisma/basic-pages/get";
import { DocumentRenderer, type DocumentRendererProps } from '@keystone-6/document-renderer'
import { GetNavigation } from "@/prisma/navigation/get";

const renderers: DocumentRendererProps['renderers'] = {
  block: {
    heading({ level, children, textAlign }) {
      const Comp = `h${level}` as const
      return <Comp style={{ textAlign, textTransform: 'uppercase' }}>{children}</Comp>
    },
  },
  inline: {
    relationship({ relationship, data }) {
      if (relationship === 'mention') {
        if (data === null || data.data === undefined) {
          return <span>[unknown author]</span>
        } else {
          return <Link href={`/author/${data.data.id}`}>{data.data.name}</Link>
        }
      }
      return null
    },
  },
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
      url: `/${url}`
    }
  });
  if (!navigation || navigation.length === 0) {
    console.error('Navigation not found');
    return <div>Navigation not found</div>;
  }
  console.log('navigation', navigation[0].id);
  const basicPagesData = await GetBasicPages(navigation[0].id);
  console.log('basicPages', basicPagesData);
  return (
    <div>
      {
        basicPagesData && basicPagesData.length ? basicPagesData.map(page => {
          return (
            <div key={page.id}>
              <h1>{page.title}</h1>
              {page['content'] && page['content'].length ? page['content'].map(content => {
                if (content.status !== 'published') return null;
                return (
                  <div key={content.id}>
                    <h2>{content.title}</h2>
                    <DocumentRenderer document={JSON.parse(content.content)} renderers={renderers} />
                  </div>
                )
              }) : null}
            </div>
          );
        }) : null}

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