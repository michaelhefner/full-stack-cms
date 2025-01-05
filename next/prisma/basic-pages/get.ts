import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetAllBasicPages = async () =>{
    if (prisma.basicPage) {    
        return await prisma.basicPage.findMany();
    }
    return null;
    
}
const GetBasicPages = async (id: string) =>{
    if (prisma.basicPage && id) {    
        return await prisma.basicPage.findFirst({
            where: {
              navigation: {
                id: {
                    equals: id
                }
              }
            },
            select: {
              id: true,
              title: true,
              author: {
                select: {
                  name: true
                }
              },
              tags: true,
              status: true,
              navigation: {
                select: {
                  url: true,
                  id: true,
                }
              },
              content: {
                select: {
                  content: true,
                  title: true,
                  authorId: true,
                  id: true,
                }
              },
            }
           });
    }
    return null;
    
}
const GetBasicPageNavigation = async () =>{
    if (prisma.basicPage) {    
        return await prisma.basicPage.findMany({
            select: {
              navigation: true
            }
          });
    }
    return null;
    
}


export { GetBasicPages, GetBasicPageNavigation, GetAllBasicPages };