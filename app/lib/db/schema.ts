"use strict"
import { createKysely } from '@vercel/postgres-kysely'; 
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

interface organizationTable {
    id: string;
    name: string;
    domain: string;
    medics: number;
}

interface userTable {
    id: string;
    name: string;
    adm: boolean;
    password: string;
    organization: string; //foreing key
}

interface patientTable {
    id: string;
    name: string;
    extraInfo: string;
    medic: string; //foreing key
}

interface spirometryTable {
    id: string;
    obstruction: number;
    restriction: number;
    date: Date;
    patient: string; //foreing key
}

interface Database {
    organizations: organizationTable,
    users: userTable
    patients: patientTable
    spirometries: spirometryTable
}

const db = createKysely<Database>();

export default db;

//-----------> Queries:

export async function login(inputData:{name: string, password: string}){
    try{
        const user = await db
        .selectFrom("users")
        .where("users.name", "=", inputData.name)
        .select(["id", "name", "password"])
        .executeTakeFirst();

        if(!user) return null;

        return {

            id: user.id,
            name: user.name,        
        
        };
    }

    catch(error: unknown)
    {
        console.log(error);
        return{
            error: await error
        };
    };
};

export async function getUserList(){
    const users = await db
                  .selectFrom("users")
                  .select(["id", "name"])
                  .executeTakeFirst();
    
    return users;
}
