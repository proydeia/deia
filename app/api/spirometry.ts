"use server"

const axios = require('axios');
import { spirometryFormSchema, spirometrieState } from "../lib/formsDefinitions/spirometryFormDefinition";
import db, { newSpirometry, Spirometry } from "../lib/dbSchema/schema";
import { uuid } from "./ID";
import { userData } from "./userData";

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

export async function getSpirometriesList (patientId: string): Promise < Spirometry[] > {
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');

    try{
        const spirometries = await db
        .selectFrom("spirometries")
        .where("spirometries.patient", "=", patientId)  
        .selectAll()
        .execute();
        return spirometries;
    }
    catch(error:unknown){
        throw new Error('D')
    }
}

export async function getSpirometry (spirometryId: string): Promise < Spirometry > {
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');
    
    try{
        const spirometry = await db 
        .selectFrom("spirometries")
        .where("spirometries.id", "=", spirometryId)
        .selectAll()
        .executeTakeFirstOrThrow();
        return spirometry;
    }

    catch(error:unknown){
        throw new Error("D");
    }
}

export async function deleteSpirometry(spirometryId: string) {
    
    const user = await userData();
    if (!user || user.adm) throw new Error('U');
    
    try{
        await db
        .deleteFrom("spirometries")
        .where("spirometries.id", "=", spirometryId)
        .executeTakeFirstOrThrow();
        return
    }
    
    catch(error:unknown){
        throw new Error('D');
    }
}

export async function createSpirometry(state: spirometrieState, formData: FormData): Promise<spirometrieState> {
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
        console.log(error)   
        return {
            message: 'Error al generar registro. Intente nuevamente.'
        };
    }
}

async function loadSpirometry(data:spirometryInput){

    try{

        const spirometryData = {
            fev1:       data.fev1,
            fev1pred:   data.fev1_lln,
            fvc:        data.fvc,
            fvcpred:    data.fvc_lln,
        }
    
        const spirometryDataAi = {
            ...spirometryData, 
            sexo:       -1,//data.sexo, 
            edad:       -1,//calculateAge(data.nacimiento),
            altura:     -1,//data.altura,
            peso:       -1,//data.peso,
        };
        
        const obstruction:number = await axios.post(`${URL}/obstruction`, spirometryData)
        .then((res:any) => {
            if(res.data.result === -1) throw new Error('Render 500');
            return res.data.result;
        })
        .catch((error:unknown) => {
            console.error(JSON.stringify(error))
            throw new Error('O');
        })
        
        const obstructionAi:number = await axios.post(`${URL}/obstructionai`, spirometryDataAi)
        .then((res:any) => {
            if(res.data.result === -1) throw new Error('Render 500');
            return res.data.result;
        })
        .catch((error:unknown) => {
            console.log(JSON.stringify(error))
            throw new Error('Oia');
        })
        
        const restriction:number = await axios.post(`${URL}/restriction`, spirometryData)
        .then((res:any) => {
            if(res.data.result === -1) throw new Error('Render 500');
            return res.data.result;
        })
        .catch((error:unknown) => {
            console.log(JSON.stringify(error))
            throw new Error('R');
        })
        
        const restrictionAi:number = await axios.post(`${URL}/restrictionai`, spirometryDataAi)
        .then((res:any) => {
            if(res.data.result === -1) throw new Error('Render 500');
            return res.data.result;
        })
        .catch((error:unknown) => {
            console.log(JSON.stringify(error))
            throw new Error('Ria');
        })
            
        const spirometryId = await uuid("spirometries");	
        
        var date = new Date;
        date.setDate(date.getDate() + 1);
        
        const spirometry: newSpirometry = {
            patient:        data.id,
            ...spirometryData,
            id:             spirometryId,
            obstruction:    obstruction,
            obstructionai:  obstructionAi,
            restriction:    restriction,
            restrictionai:  restrictionAi,
            date:           date
        }; 
        
        const spirometryDB: newSpirometry = await db
        .insertInto("spirometries")
        .values(spirometry)
        .returningAll()
        .executeTakeFirstOrThrow();
        
        if(spirometryDB instanceof Error)
        {
            deleteSpirometry(spirometryId);
            throw new Error('DB');
        }
    
        return

    }
    catch(error:unknown){
        console.log(error)
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