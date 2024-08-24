"use server"

import { spirometryFormSchema, spirometrieState } from "../lib/formsDefinitions/spirometryFormDefinition";
import db, { newSpirometry, Spirometry } from "../lib/dbSchema/schema";
import { uuid } from "./ID";
import { DeleteResult } from "kysely";
import { checkMedic } from "./userData";
const axios = require('axios');
const moment = require('moment');

// Datos del input medico

axios.defaults.withCredentials = true
const URL = process.env.URL

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
    
    const medic = await checkMedic();
    
    try{
        const spirometries = await db
        .selectFrom("spirometries")
        //.innerJoin("patients", "spirometries.patient", "patients.id")     // Relación entre espirometria y paciente
        //.innerJoin("users", "patients.medic", "users.id")                 // Relación entre paciente y medico
        //.where("patients.medic", "=", medic)                              // El medico esta relacionado con el paciente  
        .where("spirometries.patient", "=", patientId)                      // El paciente esta relacionado con la espirometria   
        .selectAll()
        .execute();                                                         // Devuelve las espirometrias; si no existen, devuelve una lista vacia.

        return spirometries;
    }

    catch(error:unknown){
        throw new Error('D')
    }
}

export async function getSpirometry (spirometryId: string): Promise < Spirometry > {
    
    const id = await checkMedic();
    
    try{
        const spirometry = await db 
        .selectFrom("spirometries")
        //.innerJoin("patients", "spirometries.patient", "patients.id")   // Relación entre espirometria y paciente
        //.innerJoin("users", "patients.medic", "users.id")               // Relación entre paciente y medico
        //.where("patients.medic", "=", id)                               // El medico esta relacionado con el paciente
        .where("spirometries.id", "=", spirometryId)                    // La espirometria esta relacionada con el id
        .selectAll()
        .executeTakeFirstOrThrow();                                     // Devuelve la espirometria; si no existe, devuelve un error.

        return spirometry;
    }

    catch(error:unknown){
        throw new Error("D");
    }
}

export async function deleteSpirometry(spirometryId: string): Promise < DeleteResult > {
    
    const id = await checkMedic();
    
    try{
        return await db
        .deleteFrom("spirometries")
        //.innerJoin("patients", "spirometries.patient", "patients.medic")
        //.innerJoin("users", "patients.medic", "users.id")
        //.where("patients.medic", "=", id)
        .where("spirometries.id", "=", spirometryId)
        .executeTakeFirstOrThrow();
    }
    
    catch(error:unknown){
        throw new Error('D');
    }
}

export async function createSpirometry(state: spirometrieState, formData: FormData): Promise<spirometrieState> { // "Crea" una espirometria.
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

    checkMedic();


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
            sexo:       data.sexo,
            edad:       calculateAge(data.nacimiento),
            altura:     data.altura,
            peso:       data.peso,
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
            
        const spirometryId = await uuid("spirometries"); // Genera un UUID único.	
        var date = new Date; // Genera fecha actual.
        date.setDate(date.getDate() + 1); // Ajusta la hora a la de Uruguay.
        console.log(date)
        
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
        
        const spirometryDB: newSpirometry = await db //guardado en la DB 
        .insertInto("spirometries")
        .values(spirometry)
        .returningAll()
        .executeTakeFirstOrThrow();
        
        if(spirometryDB instanceof Error) //error handling del guardado de la data 
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

    // If the birthdate hasn't occurred yet this year, subtract one from the age
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }

    return age;
}