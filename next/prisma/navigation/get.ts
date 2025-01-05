import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetNavigation = async (obj: any) =>{
    if (prisma.navigation) {    
        return await prisma.navigation.findMany(obj);
    }
    return null;
    
}
const GetAllNavigation = async () =>{
    if (prisma.navigation) {    
        return await prisma.navigation.findMany({
            select: {
              id: true,
              title: true,
              status: true,
              url: true,
              parent: {
                select: {
                    title: true,
                    url: true,
                }
            }
        }
        });
    }
    return null;
    
}

export { GetNavigation, GetAllNavigation };