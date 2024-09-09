"use server"
import db, { Patient } from "../lib/dbSchema/schema";
import { uuid } from "./ID";
import { userData } from "./userData";
import {patientFormSchema, patientState} from '@/app/lib/formsDefinitions/patientFormDefinition';

// Pacientes

export async function getPatientsList(): Promise < Patient[] > {
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{    
        return await db
        .selectFrom("patients")
        .where("patients.medic", "=", user.id)
        .selectAll()
        .execute();        
    }
    catch(error:unknown){
        throw new Error('D');
    }
}

export async function getPatient(patientId:string): Promise < Patient > {
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{
        return await db
        .selectFrom("patients")
        .where("patients.medic", "=", user.id)
        .where("patients.id", "=", patientId)
        .selectAll()
        .executeTakeFirstOrThrow();
    }
    catch(error:unknown){
        throw new Error('D');
    }
}

export async function deletePatient(patientId: string) {
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{
        await db.transaction().execute(async (trx) => {
            // Delete spirometries related to the patient
            await trx
                .deleteFrom("spirometries")
                .where("spirometries.patient", "=", patientId)
                .executeTakeFirstOrThrow();

            // Delete the patient
            await trx
                .deleteFrom("patients")
                .where("patients.medic", "=", user.id)
                .where("patients.id", "=", patientId)
                .executeTakeFirstOrThrow();
        });

        return {
            message:'Paciente eliminado con éxito.'
        }
    }
    catch(error:unknown){
        return {
            message:'Error al eliminar registro.'
        }
    }
}

export async function createPatient(state:patientState, formData:FormData) {

    const validatedFields = patientFormSchema.safeParse({
        name:       formData.get('name'),
        extrainfo:  formData.get('extrainfo'),
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
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{
        const uniqueId = await uuid("patients")
        const date = validatedFields.data.nacimiento
        date.setDate(date.getDate() + 1); //lo mismo que las espirometrias

        
        const newPatient = await db
        .insertInto("patients")
        .values({
            id:         uniqueId,
            medic:      user.id,
            name:       validatedFields.data.name,
            peso:       validatedFields.data.peso,
            altura:     validatedFields.data.altura,
            sexo:       validatedFields.data.sexo   -   1,
            nacimiento: date,
            extrainfo:  validatedFields.data.extrainfo as string,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

        return {
            message:'Registro creado con éxito.',
            patient: newPatient
        };
    }
    catch(error: unknown){
        return {
            message:'Error al crear registro. Intente denuvo más tarde.'
          };
    }
}
