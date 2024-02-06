import { PrismaClient } from "@prisma/client";

const client = new PrismaClient() 
// for prod
// || globalThis.prisma;
// if(process.env.NODE_ENV === "production") globalThis.prisma = client;

export default client;