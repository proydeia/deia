"use server"
import db, { newPatient, Patient } from "../lib/db/schema";
import { uuid } from "./generateId";
import { userId, isAdmin } from "./token";
import { DeleteResult } from "kysely";

// Datos del input medico

type pacientInput = {
    name: string;
    extraInfo: string;
}

// Pacientes

export async function getPatientsList(): Promise < Patient[] > {
    
    const id: string | null = await userId();
    if (!id || await isAdmin()) throw new Error('U')
    
    try{    
        return await db
        .selectFrom("patients")

        .where("patients.medic", "=", id)                   // El medico esta relacionado con el paciente
        
        .selectAll()
        .execute();        
    }

    catch(errror:unknown){
        throw new Error('D');
    }
}

export async function getPatient(patientId:string): Promise < Patient > {
    
    const id = await userId();
    
    if (!id || await isAdmin()) throw new Error('U');
    
    try{
        
        return await db
        .selectFrom("patients")
        
        .where("patients.medic", "=", id)                   // El medico esta relacionado con el paciente
        .where("patients.id", "=", patientId)               // El paciente esta relacionado con el id
        
        .selectAll()
        .executeTakeFirstOrThrow();
    }

    catch(error:unknown){
        throw new Error('D');
    }
}



export async function deletePatient(patientId: string): Promise < DeleteResult > {
    
    const id: string | null = await userId();
    if(!id || await isAdmin()) throw new Error('U');
    
    try{
        return await db
        .deleteFrom("patients")

        .where("patients.medic", "=", id)                   // El medico esta relacionado con el paciente
        .where("patients.id", "=", patientId) 
        
        .executeTakeFirstOrThrow();
    }
    
    catch(error:unknown){
        throw new Error('D');
    }
}



export async function createPatient(patientData:pacientInput): Promise < newPatient > {
    
    const id = await userId();
    
    if(!id || await isAdmin()) throw new Error('U')

    try{
        const uniqueId = await uuid("patients")
        
        console.log(id)
        return await db
        .insertInto("patients")
        .values({
            id: uniqueId,
            name: patientData.name,
            extrainfo: patientData.extraInfo,
            medic: id,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    }

    catch(error: unknown){
        console.log(JSON.stringify(error))
        throw new Error('D')
    }
}
