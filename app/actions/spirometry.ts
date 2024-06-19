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

export async function getSpirometriesList (patientId: string): Promise < Spirometry[] > { // Devuelve la lista completa de todas las espirometrias de un paciente.
    try{
        const id: string | null = await userId();
        
        if(!id || await isAdmin()) throw new Error('U');
        //ya ckeee q el med existe, checkear que el paciente asignado es el correcto, checkear que la esp asignada es la correcta
        const spirometries = await db
        .selectFrom("spirometries")
        .where("spirometries.patient", "=", patientId)

        .innerJoin("patients", "spirometries.patient", "patients.id")
        .innerJoin("users", "patients.medic", "users.id")
        
        .where("patients.medic", "=", id)
        
        .selectAll()
        .execute();

        return spirometries;
    }

    catch(error:unknown){
        throw new Error('D')
    }
}



export async function getSpirometry(spirometryId: string): Promise < Spirometry | String > { // Devuelve una espirometria en particular.
    try{
        const id: string | null = await userId();
        
        if(!id || await isAdmin()) throw new Error("U");

        const spirometry = await db 
        .selectFrom("spirometries")
        
        .innerJoin("patients", "spirometries.patient", "patients.id")
        .innerJoin("users", "patients.medic", "users.id")

        .where("spirometries.id", "=", spirometryId)
        .where("patients.medic", "=", id)

        .selectAll()
        .executeTakeFirstOrThrow();

        return spirometry;
    }

    catch(error:unknown){
        throw new Error("D");
    }
}



export async function deleteSpirometry(spirometryId: string): Promise < DeleteResult | String > { // Borra una espirometria en particular.
    const id: string | null = await userId();

    if(!id || await isAdmin()) throw new Error('U');
    
    try{
        return await db
        .deleteFrom("spirometries")
        .innerJoin("patients", "spirometries.patient", "patients.medic")
        .where("spirometries.id", "=", spirometryId)
        .where("patients.medic", "=", id)
        .executeTakeFirstOrThrow();
    }
    
    catch(error:unknown){
        throw new Error('D');
    }
}



export async function createSpirometry(spirometry: spirometryInput): Promise < NextResponse | String > { // "Crea" una espirometria.
    const id = await userId();
    if (!id || await isAdmin()) return 'U';
    try{
        const analizedSpirometry:newSpirometry | Error = await analyzeAndSaveSpirometry(spirometry);
        if(analizedSpirometry instanceof Error) throw analizedSpirometry;
        
        return NextResponse.redirect("@/spirometries")//(`@/app/authorized/paciente/espirometrias/${analizedSpirometry.id}`)
    }
    catch(error:unknown){
        return 'E';
    }

}

async function analyzeAndSaveSpirometry(spirometryData: spirometryInput): Promise < newSpirometry > { // Analiza y guarda la espirometria en la DataBase.
    try{  
        const obstruction:number = await axios.post("http://127.0.0.1:8000/obstruction", spirometryData)
        .then((res:any) => {
            return res.data.result; // Devuelve el analisis obstructivo.
        })
        .catch((err:unknown) => {
            throw new Error("Error al analizar la obstruccion");
        })


        const restriction:number = await axios.post("http://127.0.0.1:8000/restriction", spirometryData)
        .then((res:any) => {
            return res.data.result; // Devuelve el analisis restrictivo.
        })
        .catch((err:unknown) => {
            throw new Error("Error al analizar la restriccion");
        })


        const date = moment().format("YYYY-MM-DD"); // Genera fecha actual.

        const spirometryId = await uuid("spirometries"); // Genera un UUID único.	
        
        // Crea el objeto spirometry con los datos de entrada, los del analisis, la fecha y el UUID.
        
        const spirometry: newSpirometry = {
            ...spirometryData,
            id:spirometryId,
            obstruction:obstruction,
            restriction:restriction,
            date:date
        }; 
        

        // Guarda todos los datos en la DB y los devuelve, en conjunto 
        // con los no incluidos que se generan en la DB por default (enjson, etc.)

        const spirometryDB: newSpirometry | undefined = await db 
        .insertInto("spirometries")
        .values(spirometry)
        .returningAll()
        .executeTakeFirstOrThrow();

        // Si la respuesta de la DB despues de guardar la espirometria es un Error se considera que falló el guardado en la DB.
        // Si no, devuelve la espirometria guardada en la DB.
        
        if(spirometryDB instanceof Error) deleteSpirometry(spirometryId);

        // Si se guardo pero no devuelve nada, se considera que falló el guardado en la DB eintenta borrar.

        // Por último, devuelve la espirometria guardada en la DB.

        return spirometryDB;
    }
    catch(error:unknown){
        throw new Error("Error al analizar y/o guardar la espirometria");
    }
}
