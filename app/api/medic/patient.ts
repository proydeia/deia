"use server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { userData } from "../auth/userData";
import { patientFormSchema, patientState } from '$/formsDefinitions/patientFormDefinition';

// Pacientes

export async function getPatientsList(){
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    console.log(user.id);

    try{
        return await prisma.patient.findMany({
            where: {
                medic: user.id
            },
            select: {
                id: true,
                name: true
            },
        });        
    }
    catch(error:unknown){
        console.log(error);
        throw new Error('D');
    }
}

export async function getPatient(patientId:number){
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{
        return await prisma.patient.findUnique({
            where: {
                id: patientId
            },
            select: {
                id: true,
                name: true,
                peso: true,
                altura: true,
                sexo: true,
                nacimiento: true,
                extrainfo: true,
                spirometries: {
                    select: {
                        id: true,
                        date: true,
                        fvc: true,
                        fev1: true,
                    }
                }
            },

    });
    }
    catch(error:unknown){
        console.log(error);
        throw new Error('D');
    }
}

export async function deletePatient(patientId: number) {
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    console.log(patientId);

    try{
        await prisma.patient.delete({
            where: {
                id: patientId
            },
            include:{
                spirometries: {
                    where: {
                        patient: patientId
                    }
                }
            }
        });

        return {
            message:'Paciente eliminado con éxito.'
        }
    }
    catch(error:unknown){
        console.log(error);
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
                medic:      user.id,
                name:       validatedFields.data.name,
                peso:       validatedFields.data.peso,
                altura:     validatedFields.data.altura,
                sexo:       validatedFields.data.sexo - 1,
                nacimiento: new Date(date),
                extrainfo:  validatedFields.data.extrainfo as string,
            }
        });

        return {
            message:'Registro creado con éxito.',
            patient: newPatient
        };
    }
    catch(error: unknown){
        console.log(error);
        return {
            message:'Error al crear registro. Intente denuvo más tarde.'
          };
    }
}
