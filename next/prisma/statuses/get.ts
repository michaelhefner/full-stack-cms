import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetStatus = async (id: string) =>{
    console.log(id)
    let result = null;
    if (prisma.status) {    
        result =  await prisma.status.findMany({
            where: {
              id: {
                  equals: id
              }
            }
        });
    }
    console.log(result);
    return result;
    
}
export { GetStatus };