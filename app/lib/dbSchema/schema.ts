
import { Insertable, Selectable, TableExpression, Updateable, } from "kysely";
import { createKysely, } from '@vercel/postgres-kysely'; 
const bcrypt = require('bcryptjs');

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
    extrainfo: string | undefined;
    medic: string; //foreing KEY
    peso: number;
    altura: number;
    nacimiento: Date;
    sexo: number;
}

interface spirometryTable {
    id: string; //Primary KEY
    obstruction: number;
    obstructionai: number;
    restriction: number;
    restrictionai: number;
    patient: string; //Foreing KEY
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
    patients: patientTable
    spirometries: spirometryTable
}

const db = createKysely<Database>();

export type newSpirometry = Insertable<spirometryTable>; 
export type Spirometry = Selectable<spirometryTable>; 

export type newPatient = Insertable<patientTable>;
export type Patient = Selectable<patientTable>;

export type newMedic = Insertable<userTable>;
export type Medic = Selectable<userTable>;

export type DatabaseType = Database;

export default db;

//-----------> basic methods that i liked in here hehe

export async function login(inputData:{name: string, password: string}){
    try{
        const user = await db
        .selectFrom("users")
        .where("users.name", "=", inputData.name)
        .select(["id", "name", "password", "adm", "organization"])
        .executeTakeFirst();

        if( !user || !await compare(user.password,inputData.password)) return null;

        return {
            id: user.id,
            name: user.name,
            adm: user.adm,
            organization: user.organization
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

export async function googleOauth(email:string){
    const user = await db.selectFrom("users").where("name", "=", email).select(["id", "name", "adm", "organization"]).executeTakeFirst();
    return user;
};
