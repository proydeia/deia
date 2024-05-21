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
    id: string; //Primary KEY
    name: string;
    domain: string;
    medics: number;
}

interface userTable {
    id: string; //Primary KEY
    name: string;
    adm: boolean;
    password: string;
    organization: string; //Foreing KEY
}

interface patientTable {
    id: string; //Primary KEY
    name: string;
    extraInfo: string;
    medic: string; //foreing KEY
}

interface spirometryTable {
    id: string; //Primary KEY
    obstruction: number;
    restriction: number;
    patient: string; //Foreing KEY
    date: Date;
    fev1: Float32Array;
    fev1pred: Float32Array;
    fvc: Float32Array;
    fvcpred: Float32Array;
    correctionobs: number;
    correctionobsmed: number;
    correctionres: number;
    correctionresmed: number;
    enjson: boolean;
}

interface Database {
    organizations: organizationTable,
    users: userTable
    patients: patientTable
    spirometries: spirometryTable
}

const db = createKysely<Database>();

export type newSpirometry = Insertable<spirometryTable>; 
export type newPatient = Insertable<patientTable>; 

export default db;

//-----------> Queries:

export async function checkIfExists(table:TableExpression<Database, keyof Database>, id:string): Promise<boolean> {
    try {
        const idList = await db
        .selectFrom(table)
        .select("id")
        .execute();        
        return id in idList 
    } 
    catch(e){
        throw new Error("Error interno de la base de datos al checkear la eistencia del ID");
    }
}

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