import { compare } from "./salt&hash";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function login(inputData:{name: string, password: string}){
    try{
        const user = await prisma.user.findFirst({
            where: {
                email: inputData.name
            },
            select: {
                email: true,
                password: true,
                adm: true,
                organization: true
            }
        });
        
        if(!user || !await compare(user.password, inputData.password)) 
        {
            return null;
        }

        return {
            id: user.email,
            password: user.password,
            adm: user.adm,
            organization: user.organization
        };

    }
    catch(error: unknown)
    {
        return { error: error };
    };
};

export async function googleOauth(email:string){
    const user = await prisma.user.findFirst({
        where: {
            email: email
        },
        select: {
            email: true,
            password: true,
            adm: true,
            organization: true
        },
    });
    return user;
};