import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetSiteSettings = async () =>{
    if (prisma.siteSetting) {
        return await prisma.siteSetting.findMany();
    }
    return null;
}

export { GetSiteSettings };