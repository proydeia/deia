"use server"
const axios = require('axios');
import { spirometryFormSchema, spirometryState } from "@/app/lib/formsDefinitions/spirometryFormDefinition";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { userData } from "../auth/userData";

axios.defaults.withCredentials = true
const URL = process.env.URL

// Datos del input medico

type spirometryInput = {
    id:         string;
    peso:       number;
    sexo:       number;
    altura:     number;
    nacimiento: Date;
    fev1:       number;
    fev1_lln:   number;
    fvc:        number;
    fvc_lln:    number;
}

// Espirometrias

export async function getSpirometryList (patientId: number){
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{
        return await prisma.spirometry.findMany({
            where:{
                patient: patientId
            },
            select:{
                date: true,
                fev1: true,
                fev1pred: true,
                id:true
            }
        })
    }
    catch(error:unknown){
        console.log(error);
        throw new Error('D')
    }
}

export async function getSpirometry (spirometryId: number){
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');
    
    try{
        const s = await prisma.spirometry.findUnique({
            where:{
                id: spirometryId
            },
            select:{
                date: true,
                fev1: true,
                fev1pred: true,
                fvc: true,
                fvcpred: true,
                obstruction: true,
                obstructionai: true,
                restriction: true,
                restrictionai: true,
            }
        });

        return s;   
    }
    catch(error:unknown){
        console.log(error);
        throw new Error("D");
    }
}

export async function deleteSpirometry(spirometryId: number) {
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{
        await prisma.spirometry.delete({
            where:{
                id: spirometryId,
            },
        })
        return
    }
    catch(error:unknown){
        console.log(error);
        throw new Error('D');
    }
}

export async function createSpirometry(state: spirometryState, formData: FormData): Promise<spirometryState> {
    const validatedFields = spirometryFormSchema.safeParse({
        id:         formData.get('id'),
        sexo:       Number(formData.get('sexo')),
        altura:     Number(formData.get('altura')),
        peso:       Number(formData.get('peso')),
        nacimiento: new Date(formData.get('nacimiento') as string),
        fev1:       Number(formData.get('fev1')),
        fev1_lln:   Number(formData.get('fev1_lln')),
        fvc:        Number(formData.get('fvc')),
        fvc_lln:    Number(formData.get('fvc_lln')),
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
    };

    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{
        await loadSpirometry(validatedFields.data);
        return {
            message:'Registro creado con exito'
        };
    }
    catch(error:unknown){
        return {
            message: 'Error al generar registro. Intente nuevamente.'
        };
    }
}

async function loadSpirometry(data:spirometryInput){
    try{
        const spirometryData = {
            fev1:       data.fev1,
            fev1pred:   -1,
            fvc:        data.fvc,
            fvcpred:    -1,
        }
    
        const spirometryDataAi = {
            ...spirometryData, 
            sexo:       data.sexo, 
            edad:       calculateAge(data.nacimiento),
            altura:     data.altura,
            peso:       -1,
        };
        
        const obstruction:number = await axios.post(`${URL}/obstructiongold`, spirometryData)
        .then((res:any) => {
            if(res.data.result === -1) throw new Error('Render 500');
            return res.data.result;
        })
        .catch((error:unknown) => {
            throw new Error('O');
        })
        
        const obstructionAi:number = await axios.post(`${URL}/obstructionaigold`, spirometryDataAi)
        .then((res:any) => {
            if(res.data.result === -1) throw new Error('Render 500');
            return res.data.result;
        })
        .catch((error:unknown) => {
            throw new Error('Oia');
        })
        
        const restriction:number = await axios.post(`${URL}/restrictiongold`, spirometryData)
        .then((res:any) => {
            if(res.data.result === -1) throw new Error('Render 500');
            return res.data.result;
        })
        .catch((error:unknown) => {
            throw new Error('R');
        })
        
        const restrictionAi:number = await axios.post(`${URL}/restrictionaigold`, spirometryDataAi)
        .then((res:any) => {
            if(res.data.result === -1) throw new Error('Render 500');
            return res.data.result;
        })
        .catch((error:unknown) => {
            throw new Error('Ria');
        })	
        
        var date = new Date;
        date.setDate(date.getDate() + 1); //no se que le pasa pero me resta un dia. esta fue la mejor soucion un miercoles a las 23:48pm
        
        const spirometry = {
            patient:        data.id,
            ...spirometryData,
            obstruction:    obstruction,
            obstructionai:  obstructionAi,
            restriction:    restriction,
            restrictionai:  restrictionAi,
            date:           date
        }; 
        
        console.log(spirometry);
        
        // return await prisma.spirometry.create({
        //     data: {
        //         patient: data.id,
                
        //     }
        // });
    }
    catch(error:unknown){
        console.log(error);
        throw new Error('D');
    }
}

function calculateAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
}
