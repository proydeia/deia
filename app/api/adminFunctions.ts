"use server"
import { get } from "http";
import db, { User } from "../lib/dbSchema/schema";
import { uuid } from "./ID";
import { isAdmin, org, userId } from "./userData";
import { deletePatient, getPatientsList } from "./patient";

// Pacientes

export async function getMecicList(): Promise < User[] > {    
    const organization = await org();

    if(!isAdmin){
        throw new Error('U');
    }
    
    try{    
        return await db
        .selectFrom("users")
        .where("adm", "=", false)                   // El medico esta relacionado con el paciente
        .where("organization", "=", organization)
        .selectAll()
        .execute();        
    }

    catch(error:unknown){
        throw new Error('D');
    }
}

export async function getMedic(medicId:string): Promise < User > {
    const organization = await org();
    
    if(!isAdmin){
        throw new Error('U');
    }
    
    try{
        return await db
        .selectFrom("users")
        .where("organization", "=", organization)               // El paciente esta relacionado con el id
        .where("adm", "=", false)               // El paciente esta relacionado con el id
        .where("id", "=", medicId)                   // El medico esta relacionado con el paciente
        .selectAll()
        .executeTakeFirstOrThrow();
    }

    catch(error:unknown){
        throw new Error('D');
    }
}

export async function getMedicPatientsList(medicId:string) {
    try{    
        return await db
        .selectFrom("patients")
        .where("patients.medic", "=", medicId)                   // El medico esta relacionado con el paciente
        .selectAll()
        .execute();        
    }

    catch(error:unknown){
        throw new Error('D');
    }
}

export async function deleteMedic(medicId: string) { //agregar el estado al boton (form) y que muestre el message
    const organization = await org();    

    if(!isAdmin){
        throw new Error('U');
    }
    
    try{
        await db
        .deleteFrom("spirometries")
        .innerJoin("spirometries", "spirometries.patient", "patient")
        .innerJoin("patients", "patients.medic", "medic")
        .innerJoin("users", "users.id", "patients.medic")
        .where("users.id", "=", medicId)

        await db
        .deleteFrom("patients")
        .innerJoin("patients", "patients.id", "id")
        .innerJoin("users", "users.id", "patients.medic")
        .where("users.id", "=", medicId)

        await db
        .deleteFrom("users")
        .where("organization", "=", organization)               // El paciente esta relacionado con el id
        .where("adm", "=", false)                               // El paciente esta relacionado con el id
        .where("id", "=", medicId)                              // El medico esta relacionado con el paciente
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

// export async function createPatient(state:patientState, formData:FormData) {

//     const validatedFields = patientFormSchema.safeParse({
//         name:       formData.get('name'),
//         extrainfo:  formData.get('extrainfo'),
//         peso:       Number(formData.get('peso')),
//         altura:     Number(formData.get('altura')),
//         sexo:       Number(formData.get('sexo')),
//         nacimiento: new Date(formData.get('nacimiento') as string),
//     });

//     if (!validatedFields.success) {
//         return {
//           errors: validatedFields.error.flatten().fieldErrors,
//         };
//     };
    
//     const id = await isAdmin();

//     try{

//         const uniqueId = await uuid("patients")
//         const date = validatedFields.data.nacimiento
//         date.setDate(date.getDate() + 1); // Ajusta la hora a la de Uruguay.

        
//         const newUser = await db
//         .insertInto("patients")
//         .values({
//             id:         uniqueId,
//             medic:      id,
//             name:       validatedFields.data.name,
//             peso:       validatedFields.data.peso,
//             altura:     validatedFields.data.altura,
//             sexo:       validatedFields.data.sexo   -   1,
//             nacimiento: date,
//             extrainfo:  validatedFields.data.extrainfo as string,
//         })
//         .returningAll()
//         .executeTakeFirstOrThrow();

//         return {
//             message:'Registro creado con éxito.',
//             user: newUser
//         };
//     }

//     catch(error: unknown){
//         return {
//             message:'Error al crear registro. Intente denuvo más tarde.'
//           };
//     }
// }
