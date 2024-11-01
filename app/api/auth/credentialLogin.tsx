import Email from "next-auth/providers/email";
import { compare } from "./salt&hash";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function login(inputData:{name: string, password: string}){
    try{
        console.log(123131313123);
        const user = await prisma.user.findFirst({
            where: {
                email: inputData.name
            },
            include: {
                email: true,
                password: true,
                adm: true,
                organization: true,
            }
        });
        
        console.log(2222, user);
        if(user || !await compare(user.password, inputData.password)) return {
            id: user.id,
            name: user.name,
            adm: user.adm,
            organization: user.organization
        };

        return null;
    }

    catch(error: unknown)
    {
        console.log(123, error);
        return{
            error: await error
        };
    };
};

export async function googleOauth(email:string){
    const user = await prisma.findFirst({
        where: {
            email: email
        },
        include:{
            email: true,
            adm: true,
            organization: true
        }
    }); 
    return user;
};