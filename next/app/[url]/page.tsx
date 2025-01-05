import Link from "next/link";
import { GetBasicPages, GetBasicPageNavigation } from "../../prisma/basic-pages/get";
import type { DocumentRendererProps } from '@keystone-6/document-renderer';
import { CustomRenderer } from '../components/CustomRenderer/CustomRenderer';
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
  const navigation = await GetNavigation({
    where: {
      url: `/${url}`
    }
  });
  if (!navigation || navigation.length === 0) {
    console.error('Navigation not found');
    return <div>Navigation not found</div>;
  }
  const page = await GetBasicPages(navigation[0].id);
  
  return (
    <div>
    {page && (
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
  return basicPages.map((page): { params: { url: string } } => {
    const navigationURL: string | null = page.navigation ? page.navigation.url : null;
    return {
      params: {
        url: navigationURL || ''
      }
    }
  });
}