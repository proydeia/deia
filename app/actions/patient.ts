"use server"
import db, { newPacient, Pacient } from "../lib/db/schema";
import { uuid } from "./generateId";
import { userId, isAdmin } from "./token";
import { DeleteResult } from "kysely";

// Datos del input medico

type pacientInput = {
    name: string;
    extraInfo: string;
}

// Pacientes

export async function getPacientsList(): Promise < Pacient[] > {
    
    const id: string | null = await userId();
    if (!id || await isAdmin()) throw new Error('U')
    
    try{    
        return await db
        .selectFrom("pacients")

        .where("pacients.medic", "=", id)                   // El medico esta relacionado con el paciente
        
        .selectAll()
        .execute();        
    }

    catch(errror:unknown){
        throw new Error('D');
    }
}

export async function getPacient(patientId:string): Promise < Pacient > {
    
    const id = await userId();
    if (!id || await isAdmin()) throw new Error('U');
    
    try{
        
        return await db
        .selectFrom("pacients")
        
        .where("pacients.medic", "=", id)                   // El medico esta relacionado con el paciente
        .where("pacients.id", "=", patientId)               // El paciente esta relacionado con el id
        
        .selectAll()
        .executeTakeFirstOrThrow();
    }

    catch(error:unknown){
        throw new Error('D');
    }
}



export async function deletePacient(patientId: string): Promise < DeleteResult > {
    
    const id: string | null = await userId();
    if(!id || await isAdmin()) throw new Error('U');
    
    try{
        return await db
        .deleteFrom("pacients")

        .where("pacients.medic", "=", id)                   // El medico esta relacionado con el paciente
        .where("pacients.id", "=", patientId) 
        
        .executeTakeFirstOrThrow();
    }
    
    catch(error:unknown){
        throw new Error('D');
    }
}



export async function createPacient(patientData:pacientInput): Promise < newPacient > {
    
    const id = await userId();
    if(!id || await isAdmin()) throw new Error('U')

    try{
        const id = await uuid("pacients")

        return await db
        .insertInto("pacients")
        .values({
            id: id,
            name: patientData.name,
            extrainfo: patientData.extraInfo,
            medic: id,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    }

    catch(error: unknown){
        throw new Error('D')
    }
}
