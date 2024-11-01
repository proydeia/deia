"use server";
import db, { Patient } from "$/dbSchema/schema";
import { uuid } from "../ID";
import { userData } from "../auth/sessionData";
import { patientFormSchema, patientState } from '$/formsDefinitions/patientFormDefinition';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

// Pacientes

export async function getPatientList(){
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{    
        return await prisma.patient.findMany({
            where: {
                medic: user.id
            },
            select: {
                id: true,
                name: true
            }
        });   
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
        .selectFrom("patientTable")
        .where("patientTable.medic", "=", user.id)
        .where("patientTable.id", "=", patientId)
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
        await db.connection().execute(async (trx) => {
            await trx
                .deleteFrom("spirometryTable")
                .where("spirometryTable.patient", "=", patientId)
                .executeTakeFirstOrThrow();

            await trx
                .deleteFrom("patientTable")
                .where("patientTable.medic", "=", user.id)
                .where("patientTable.id", "=", patientId)
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
        const date = validatedFields.data.nacimiento
        date.setDate(date.getDate() + 1); 

        const newPatient = await prisma.patient.create({
            data: {
                id:         3,
                medic:      user.id,
                name:       validatedFields.data.name,
                peso:       validatedFields.data.peso,
                altura:     validatedFields.data.altura,
                sexo:       validatedFields.data.sexo   -   1,
                nacimiento: date,
                extrainfo:  validatedFields.data.extrainfo as string,
            },
            select: {
                name: true,
                peso: true,
                altura: true,
                sexo: true,
                nacimiento: true,
                extrainfo: true
            }
        });
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
