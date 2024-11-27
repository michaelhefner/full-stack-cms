import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetNavigation = async (obj: any) =>{
    if (prisma.navigation) {    
        return await prisma.navigation.findMany(obj);
    }
    return null;
    
}

export { GetNavigation };