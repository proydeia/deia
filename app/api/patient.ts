"use server"
import { map } from "zod";
import db, { Patient } from "../lib/db/schema";
import { uuid } from "./generateId";
import { userId, isAdmin } from "./token";
import {patientFormSchema, patientState} from '@/app/lib/definitions/patientCreation';

// Datos del input medico

type pacientInput = {
    name: string;
    extraInfo: string;
}

// Pacientes

export async function getPatientsList(): Promise < Patient[] > {
    
    const id = await userId();

    if (!id || await isAdmin()) throw new Error('U')
    
    try{    
        return await db
        .selectFrom("patients")

        .where("patients.medic", "=", id)                   // El medico esta relacionado con el paciente
        
        .selectAll()
        .execute();        
    }

    catch(error:unknown){
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

export async function deletePatient(patientId: string) {
    
    const id: string | null = await userId();

    if(!id || await isAdmin()) throw new Error('U');
    
    try{
        await db
        .deleteFrom("spirometries")

        .where("spirometries.patient", "=", patientId)

        .executeTakeFirstOrThrow();


        await db
        .deleteFrom("patients")

        .where("patients.medic", "=", id)                   // El medico esta relacionado con el paciente
        .where("patients.id", "=", patientId) 
        
        .executeTakeFirstOrThrow();
    }
    
    catch(error:unknown){
        throw new Error('D');
    }
}

export async function createPatient(state:patientState, formData:FormData): Promise<patientState> {

    const validatedFields = patientFormSchema.safeParse({
        name: formData.get('name'),
        extraInfo: formData.get('extraInfo'),
        peso: Number(formData.get('peso')),
        altura: Number(formData.get('altura')),
        sexo: Number(formData.get('sexo')),
        nacimiento: new Date(formData.get('nacimiento') as string),
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
    };
    
    const id = await userId();
    
    if(!id || await isAdmin()) throw new Error('U')

    try{
        const uniqueId = await uuid("patients")
        
        await db
        .insertInto("patients")
        .values({
            id: uniqueId,
            name: validatedFields.data.name,
            extrainfo: validatedFields.data.extrainfo as string,
            medic: id,
            peso: validatedFields.data.peso,
            altura: validatedFields.data.altura,
            sexo: validatedFields.data.sexo,
            nacimiento: validatedFields.data.nacimiento,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

        return {
            message:'Registro creado con éxito.'
          };
    }

    catch(error: unknown){
        console.log(error);
        return {
            message:'Error al crear registro. Intente denuvo más tarde.'
          };
    }
}
