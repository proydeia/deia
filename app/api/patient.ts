"use server"
import db, { newPatient, Patient } from "../lib/db/schema";
import { uuid } from "./generateId";
import { userId, isAdmin } from "./token";

// Datos del input medico

type patientInput = {
    name: string;
    extraInfo: string;
}

// Pacientes

export async function getPatientsList(): Promise < Patient[] > {
    
    const id = await userId();
    
    if (!id || await isAdmin()) throw new Error('U')
    
    try{
        const id = await userId();
        if(id == undefined) throw new Error;

        const patients = await db
        .selectFrom("patients")
        .where("patients.medic", "=", id)
        .selectAll()
        .execute();
        
        return patients;
    }
    catch(errror:unknown){
        throw new Error('D');
    }
}

export async function getPatient(patientId:string): Promise < Patient > {
    
    const id = await userId();
    
    if (!id || await isAdmin()) throw new Error('U');
    
    try{
        const id = await userId();
        
        const patient = await db
        .selectFrom("patients")
        .selectAll()
        .where("patients.id", "=", patientId)
        .where("patients.medic", "=", id)
        .executeTakeFirst();

        if(!patient) return {} as Patient;

        return patient;

    }
    catch(error:unknown){
        throw new Error('D');
    }
}

export async function createPatient(patientData:patientInput): Promise < newPatient > {
    
    const id = await userId();
    
    if(!id || await isAdmin()) throw new Error('U')

    try{
        const id = await uuid("patients")

        const patient: newPatient = await db
        .insertInto("patients")
        .values({
            id: id,
            name: patientData.name,
            extrainfo: patientData.extraInfo,
            medic: id,
        })
        .returningAll()
        .executeTakeFirstOrThrow()
        return patient
    }
    catch(error: unknown){
        throw new Error('D')
    }
}
