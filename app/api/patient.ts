"use server"
import db, { Patient } from "../lib/dbSchema/schema";
import { uuid } from "./ID";
import { userData } from "./userData";
import {patientFormSchema, patientState} from '@/app/lib/formsDefinitions/patientFormDefinition';

// Pacientes

export async function getPatientsList(): Promise < Patient[] > {
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    const id = user.id;
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
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    const id = user.id;
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
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    const id = user.id;
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

    const id = user.id;
    try{

        const uniqueId = await uuid("patients")
        const date = validatedFields.data.nacimiento
        date.setDate(date.getDate() + 1); // Ajusta la hora a la de Uruguay.

        
        const newUser = await db
        .insertInto("patients")
        .values({
            id:         uniqueId,
            medic:      id,
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
            user: newUser
        };
    }

    catch(error: unknown){
        return {
            message:'Error al crear registro. Intente denuvo más tarde.'
          };
    }
}
