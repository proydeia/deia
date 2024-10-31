
import { Insertable, Selectable } from "kysely";
import { createKysely, } from '@vercel/postgres-kysely'; 
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
    organizationTable: organizationTable,
    userTable: userTable,
    patientTable: patientTable,
    spirometryTable: spirometryTable,
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
