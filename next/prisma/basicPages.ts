import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BasicPages = async () => {
    if (prisma.basicPage) {
        return await prisma.basicPage.findMany({
            select: {
                id: true,
                title: true,
                author: true,
                tags: true,
                status: true,
            }
        });
    }
    return null;
}

export { BasicPages };