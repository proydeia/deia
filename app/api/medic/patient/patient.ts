"use server";
import { PrismaClient, Patient } from '@prisma/client';
const prisma = new PrismaClient()
import { userData } from "../../auth/userData";

// Pacientes

export async function getPatientsList(){
    
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
            where: { id: patientId },
            include: { spirometries: {
                select:{
                    id: true,
                    date: true,
                }
            } }
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

export async function createPatient(data: {
    name: string,
    altura: number,
    sexo: number,
    nacimiento: Date,
    extrainfo: string
}) {

    const user = await userData();
    if (!user || user.adm) return new Error('U');

    try{
        console.log(user.id);
        const date = new Date(data.nacimiento)
        date.setDate(date.getDate() + 1);

        const newPatient = await prisma.patient.create({
            data: {
                medic:      user.id,
                name:       data.name,
                altura:     data.altura,
                sexo:       data.sexo - 1,
                nacimiento: new Date(date),
                extrainfo:  data.extrainfo as string,
            },
            select: { 
                id: true,
                name: true,
             }
        });
        console.log(newPatient);
        return { newPatient };
    }
    catch(error: unknown){
        console.log(error);
        return new Error('D');
    }
}
