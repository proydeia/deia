import { Insertable, Selectable, TableExpression, Updateable, } from "kysely";
import { createKysely, } from '@vercel/postgres-kysely'; 
const bcrypt = require('bcrypt');

//-----------> Hashing:

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
    organization: string;
}

interface pacientTable {
    id: string;
    name: string;
    extrainfo: string;
    medic: string;
}

interface spirometryTable {
    id: string;
    obstruction: number;
    restriction: number;
    patient: string;
    date: Date;
    fev1: number;
    fev1pred: number;
    fvc: number;
    fvcpred: number;
    correctionobs: number | undefined;
    correctionobsmed: number | undefined;
    correctionres: number | undefined;
    correctionresmed: number | undefined;
    enjson: number | undefined;
}

interface Database {
    organizations: organizationTable,
    users: userTable
    pacients: pacientTable
    spirometries: spirometryTable
}

const db = createKysely<Database>();

export type newSpirometry = Insertable<spirometryTable>; 
export type Spirometry = Selectable<spirometryTable>; 

export type newPacient = Insertable<pacientTable>;
export type Pacient = Selectable<pacientTable>;

export type DatabaseType = Database;

export default db;

//-----------> Queries:

export async function login(inputData:{name: string, password: string}){
    try{
        const user = await db
        .selectFrom("users")
        .where("users.name", "=", inputData.name)
        .select(["id", "name", "password", "adm"])
        .executeTakeFirst();

        if( !user || !await compare(user.password,inputData.password) ) return null;

        //if (!await compare(user.password,inputData.password)) return null;
        
        return {

            id: user.id,
            name: user.name,
            adm: user.adm,   

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