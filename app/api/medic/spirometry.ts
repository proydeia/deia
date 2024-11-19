"use server"
const axios = require('axios');
import { spirometryFormSchema, spirometryState } from "@/app/lib/formsDefinitions/spirometryFormDefinition";
import { userData } from "#/auth/userData";
import { PrismaClient, Spirometry } from '@prisma/client';
const prisma = new PrismaClient()

axios.defaults.withCredentials = true
const URL = process.env.URL

// Datos del input medico

type spirometryInput = {
    id:         number;
    peso:       number;
    sexo:       number;
    altura:     number;
    nacimiento: Date;
    fev1:       number;
    fvc:        number;
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
                fvc:true,
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
        });
        console.log(s);
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
        id:         Number(formData.get('id')),
        sexo:       Number(formData.get('sexo')),
        altura:     Number(formData.get('altura')),
        peso:       Number(formData.get('peso')),
        nacimiento: new Date(formData.get('nacimiento') as string),
        fev1:       Number(formData.get('fev1')),
        fvc:        Number(formData.get('fvc')),
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
            fvc:        data.fvc,
            edad:       calculateAge(data.nacimiento),
            sexo:       data.sexo, 
            altura:     data.altura,
        }

        var date = new Date;
        date.setDate(date.getDate() + 1); //no se que le pasa pero me resta un dia. esta fue la mejor soucion un miercoles a las 23:48pm

        
        let newSpirometry = {
            patient: data.id,
            date: date,
            fvc: spirometryData.fvc,
            fev1: spirometryData.fev1,
            obstructiongold: -1,
            obstructionaigold: -1,
            obstructiongli: -1,
            obstructionaigli: -1,
            obstructionaigoldcategorical1: -1,
            obstructionaigoldcategorical2: -1,
            obstructionaiglicategorical1: -1,
            obstructionaiglicategorical2: -1,
            restrictiongold: -1,
            restrictionaigold: -1,
            restrictiongli: -1,
            restrictionaigli: -1,
        }

        const fetchs = [
            "obstructiongold",
            "obstructionaigold",
            "obstructiongli",
            "obstructionaigli",
            "obstructionaigoldcategorical",
            "obstructionaiglicategorical",
            "restrictiongold",
            "restrictionaigold",
            "restrictiongli",
            "restrictionaigli",
        ]
        
        for (const fetch of fetchs){
            await axios.post(`${URL}/${fetch}`, spirometryData)
            .then((res:any) => {
                if(res.data.result === -1) throw new Error('Render 500');
                if(fetch.includes('categorical')){
                    newSpirometry = {...newSpirometry, [fetch+"1"]: res.data.result1, [fetch+"2"]: res.data.result2};
                    return
                };
                newSpirometry = {...newSpirometry, [fetch]: res.data.result};
                return
            })
            .catch((error:unknown) => {
                console.log(fetch, error);
                throw new Error(fetch);
            })
        }
        console.log("newspryrometry: ", newSpirometry);
        
        return await prisma.spirometry.create({
            data: newSpirometry
        });
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
