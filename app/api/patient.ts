"use server"
import db, { Patient } from "../lib/dbSchema/schema";
import { uuid } from "./ID";
import { checkMedic } from "./userData";
import {patientFormSchema, patientState} from '@/app/lib/formsDefinitions/patientFormDefinition';

// Pacientes

export async function getPatientsList(): Promise < Patient[] > {
    
    const id = await checkMedic();
    
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
    
    const id = await checkMedic();
    
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

export async function deletePatient(patientId: string) { //agregar el estado al boton (form) y que muestre el message
    
    const id = await checkMedic();
    
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

        return {
            message:'Registro eliminado con éxito.'
        }
    }
    
    catch(error:unknown){
        return {
            message:'Error al eliminar registro. Intente denuvo más tarde.'
        }
    }
}

export async function createPatient(state:patientState, formData:FormData) {

    const validatedFields = patientFormSchema.safeParse({
        name:       formData.get('name'),
        extrainfo:  formData.get('extraInfo'),
        peso:       Number(formData.get('peso')),
        altura:     Number(formData.get('altura')),
        sexo:       Number(formData.get('sexo')),
        nacimiento: new Date(formData.get('nacimiento') as string),
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
    };
    
    const id = await checkMedic();

    try{

        const uniqueId = await uuid("patients")
        
        const newUser = await db
        .insertInto("patients")
        .values({
            id:         uniqueId,
            medic:      id,
            name:       validatedFields.data.name,
            peso:       validatedFields.data.peso,
            altura:     validatedFields.data.altura,
            sexo:       validatedFields.data.sexo,
            nacimiento: validatedFields.data.nacimiento,
            extrainfo:  validatedFields.data.extrainfo as string,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

        return {
            message:'Registro creado con éxito.',
            user: newUser
        };
    }

    catch(error: unknown){
        return {
            message:'Error al crear registro. Intente denuvo más tarde.'
          };
    }
}
