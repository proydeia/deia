"use server"
import { spirometryFormSchema, spirometrieState } from "../lib/definitions/spirometryCreation";
import db, { newSpirometry, Spirometry } from "../lib/db/schema";
import { uuid } from "./generateId";
import { DeleteResult } from "kysely";
import { checkMedic } from "./token";
const axios = require('axios');
const moment = require('moment');

// Datos del input medico

type spirometryInput = {
    patient: string;
    //peso: number;
    //sexo: number;
    //altura: number;
    //nacimiento: number;
    fev1: number;
    fev1pred: number;
    fvc: number;
    fvcpred: number;
}

// Espirometrias

export async function getSpirometriesList (patientId: string): Promise < Spirometry[] > {
    
    const id = await checkMedic();
    
    try{
        const spirometries = await db
        .selectFrom("spirometries")
        .innerJoin("patients", "spirometries.patient", "patients.id")   // Relación entre espirometria y paciente
        .innerJoin("users", "patients.medic", "users.id")               // Relación entre paciente y medico
        .where("patients.medic", "=", id)                               // El medico esta relacionado con el paciente  
        .where("spirometries.patient", "=", patientId)                  // El paciente esta relacionado con la espirometria   
        .selectAll()
        .execute();                                                     // Devuelve las espirometrias; si no existen, devuelve una lista vacia.

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
        .innerJoin("patients", "spirometries.patient", "patients.id")   // Relación entre espirometria y paciente
        .innerJoin("users", "patients.medic", "users.id")               // Relación entre paciente y medico
        .where("patients.medic", "=", id)                               // El medico esta relacionado con el paciente
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
        .innerJoin("patients", "spirometries.patient", "patients.medic")
        .innerJoin("users", "patients.medic", "users.id")
        .where("patients.medic", "=", id)
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

        fev1:       Number(formData.get('name')),
        fev1_lln:   Number(formData.get('extraInfo')),
        fvc:        Number(formData.get('peso')),
        fvc_lln:    Number(formData.get('altura')),
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
    };

    checkMedic();

    try{
        //const extraData

        const spirometryData: spirometryInput = {
            patient:    validatedFields.data.id,
            fev1:       validatedFields.data.fev1,
            fev1pred:   validatedFields.data.fev1_lln,
            fvc:        validatedFields.data.fvc,
            fvcpred:    validatedFields.data.fvc_lln,
        }
    
        const spirometryDataAi = {
            ...spirometryData, 
            peso:       validatedFields.data.peso,
            altura:     validatedFields.data.altura,
            sexo:       validatedFields.data.sexo,
            edad: calculateAge(validatedFields.data.nacimiento)
        };

        
        const obstruction:number = await axios.post("http://127.0.0.1:8000/obstruction", spirometryData)
        .then((res:any) => {
            return res.data.result;
        })
        .catch((error:unknown) => {
            console.log(JSON.stringify(error))
            throw new Error('O');
        })

        const obstructionAi:number = await axios.post("http://127.0.0.1:8000/obstructionai", spirometryDataAi)
        .then((res:any) => {
            return res.data.result;
        })
        .catch((error:unknown) => {
            console.log(JSON.stringify(error))
            throw new Error('Oia');
        })

        const restriction:number = await axios.post("http://127.0.0.1:8000/restriction", spirometryData)
        .then((res:any) => {
            return res.data.result;
        })
        .catch((error:unknown) => {
            console.log(JSON.stringify(error))
            throw new Error('R');
        })

        const restrictionAi:number = await axios.post("http://127.0.0.1:8000/restrictionai", spirometryDataAi)
        .then((res:any) => {
            return res.data.result;
        })
        .catch((error:unknown) => {
            console.log(JSON.stringify(error))
            throw new Error('Ria');
        })

        
        const spirometryId = await uuid("spirometries"); // Genera un UUID único.	
        const date = moment().format("YYYY-MM-DD"); // Genera fecha actual.
                
        
        const spirometry: newSpirometry = {
            ...spirometryData,
            id:             spirometryId,
            obstruction:    obstruction,
            obstructionai:  obstructionAi,
            restriction:    restriction,
            restrictionai:  restrictionAi,
            date:           date
        }; 
        
        const spirometryDB: newSpirometry | undefined = await db //guardado en la DB 
        .insertInto("spirometries")
        .values(spirometry)
        .returningAll()
        .executeTakeFirstOrThrow();
        
        if(spirometryDB instanceof Error) //error handling del guardado de la data 
        {
            deleteSpirometry(spirometryId);
            throw new Error('DB');
        }

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