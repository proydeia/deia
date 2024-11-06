import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function login(inputData:{name: string, password: string}){
    try{
        console.log(123, inputData.name);
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: inputData.name
            },
            select: {
                email: true,
                password: true,
                adm: true,
                organization: true,
            },
        });
    
        if(!user || !await compare(user.password, inputData.password)){
            return null;
        };

        return {
            id: user.email,
            adm: user.adm,
            organization: user.organization
        }
    }

    catch(error: unknown)
    {
        return{
            error: await error
        };
    };
};

export async function googleOauth(email:string){
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: email
        },
        select:{
            email: true,
            adm: true,
            organization: true
        }
    }); 
    return user;
};


const bcrypt = require('bcryptjs');

export async function hash(data:string) {
    return bcrypt.hash(data, 10).then(function(hash:string) {
        return hash;
    });
}

export async function compare(data:string, hash:string): Promise<boolean> {
    return bcrypt.compare(data, hash).then(function(result:boolean): boolean {
        return result;
    });
}