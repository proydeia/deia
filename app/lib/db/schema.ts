"use strict"
import { createKysely } from '@vercel/postgres-kysely'; 
import { User } from 'next-auth';
//const bcrypt = require('bcrypt');

//-----------> Hashing:

// export async function hash(data:string) {
//     return bcrypt.hash(data, 10).then(function(hash:string) {
//         return hash;
//     });
// }

// export async function compare(data:string, hash:string) {
//     return bcrypt.compare(data, hash).then(function(result:boolean) {
//         return result;
//     });
// }

//-----------> Database:

interface pTable {
    id: string;
    name: string;
    password: string;
}

interface Database {
    p: pTable
}

const db = createKysely<Database>();

export default db;

//-----------> Queries:

export async function login(inputData:{name: string, password: string}){
    try{
        const user = await db
        .selectFrom("p")
        .where("p.name", "=", inputData.name)
        .select(["id", "name", "password"])
        .execute();

        console.log(1,typeof user);

        if(user.length === 0 || !user) return null;

        return user as User;
    }

    catch(error: unknown)
    {
        return null;
    };
};

export async function getUserList(){
    const users = await db
                  .selectFrom("p")
                  .select(["id", "name"])
                  .executeTakeFirst();
    
    return users;
}
