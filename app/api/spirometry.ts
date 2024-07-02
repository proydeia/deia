"use server"
import { NextResponse } from "next/server";
import db, { newSpirometry, Spirometry } from "../lib/db/schema";
import { uuid } from "./generateId";
import { DeleteResult } from "kysely";
import { isAdmin, userId } from "./token";
const axios = require('axios');
const moment = require('moment');

// Datos del input medico

type spirometryInput = {
    patient: string;
    fev1: number;
    fev1pred: number;
    fvc: number;
    fvcpred: number;
}

// Espirometrias

export async function getSpirometriesList (patientId: string): Promise < Spirometry[] > {
    
    const id: string | null = await userId();
    if (!id || await isAdmin()) throw new Error('U');
    
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
//para cualquier funcion de base de datos, llamarlo en un try catch y manejar los errores
// const a = async () => {
//     try{
//         return await getSpirometriesList("1")
//     }
//     catch(error:unknown){
//         chekear info del error y dcidir la rta

//     }
// }


export async function getSpirometry (spirometryId: string): Promise < Spirometry > {
    
    const id: string | null = await userId();
    if (!id || await isAdmin()) throw new Error("U");
    
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
    
    const id: string | null = await userId();
    if(!id || await isAdmin()) throw new Error('U');
    
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



export async function createSpirometry(spirometry: spirometryInput): Promise < NextResponse > { // "Crea" una espirometria.
    
    const id = await userId();
    if (!id || await isAdmin()) throw new Error('U');

    try{
        const analizedSpirometry:newSpirometry = await analyzeAndSaveSpirometry(spirometry);
        if(analizedSpirometry instanceof Error) throw analizedSpirometry;
        
        return NextResponse.redirect("@/spirometries")//(`@/app/authorized/paciente/espirometrias/${analizedSpirometry.id}`)
    }
    
    catch(error:unknown){
        throw new Error('E');
    }
}



async function analyzeAndSaveSpirometry(spirometryData: spirometryInput): Promise < newSpirometry > { // hacer una unica funcion. implementar en la de arriba
    try{  
        
        const obstruction:number = await axios.post("http://127.0.0.1:8000/obstruction", spirometryData)
        .then((res:any) => {
            return res.data.result;
        })
        .catch((err:unknown) => {
            throw new Error('O');
        })

        //callwear obstructionai

        const restriction:number = await axios.post("http://127.0.0.1:8000/restriction", spirometryData)
        .then((res:any) => {
            return res.data.result;
        })
        .catch((err:unknown) => {
            throw new Error('R');
        })

        //callwear restrictionai

        const date = moment().format("YYYY-MM-DD"); // Genera fecha actual.

        const spirometryId = await uuid("spirometries"); // Genera un UUID único.	
                
        const spirometry: newSpirometry = {
            ...spirometryData,
            id:spirometryId,
            obstruction:obstruction,
            restriction:restriction,
            date:date
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

        return spirometryDB;
    }

    catch(error:unknown){
        throw new Error('I');
    }
}
