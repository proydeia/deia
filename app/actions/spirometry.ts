"use server"
import db, { newSpirometry, Spirometry } from "../lib/db/schema";
import { uuid } from "./generateId";
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

export async function getSpirometriesList (patientId: string): Promise <Spirometry[] | Error> { //devuelve todas las espirometrias de un paciente.
    try{
        const spirometries = await db //Busca las espirometrias en la DB en base al ID del paciente.
        .selectFrom("spirometries")
        .where("spirometries.patient", "=", patientId)
        .selectAll()
        .execute();
        
        return spirometries;
    }
    catch(error:unknown){
        return new Error("Error al buscar las espirometrias");
    }
}



export async function getSpirometry(spirometryId: string): Promise < Spirometry | Error > { //devuelve una espirometria en particular.
    try{
        const spirometry = await db //Busca la espirometria en la DB en base a su ID.
        .selectFrom("spirometries")
        .where("spirometries.id", "=", spirometryId)
        .selectAll()
        .executeTakeFirst();

        if(spirometry === undefined){
            throw new Error("Espirometria no encontrada");
        }

        return spirometry;
    }
    catch(error:unknown){
        return new Error("Error al buscar la espirometria");
    }
}



export async function createSpirometry(spirometryData: spirometryInput): Promise < Error | newSpirometry > {
    try{   
        const obstruction:number = await axios.post("http://127.0.0.1:8000/obstruction", spirometryData)
        .then((res:any) => {
            return res.data.result; //Devuelve el analisis obstructivo.
        })
        .catch((err:any) => {
            throw new Error("Error al analizar la obstruccion");
        })

        const restriction:number = await axios.post("http://127.0.0.1:8000/restriction", spirometryData)
        .then((res:any) => {
            return res.data.result; //Devuelve el analisis restrictivo.
        })
        .catch((err:any) => {
            throw new Error("Error al analizar la restriccion");
        })

        const date = moment().format("YYYY-MM-DD"); //Genera fecha actual.

        const spirometryId = await uuid("spirometries"); // Genera un UUID único.	
        
        //Crea el objeto spirometry con los datos de entrada, los del analisis, la fecha y el UUID.
        
        const spirometry: newSpirometry = {
            ...spirometryData,
            id:spirometryId,
            obstruction:obstruction,
            restriction:restriction,
            date:date
        }; 
        
        //Guarda todos los datos en la DB y los devuelve, en conjunto 
        //con los no incluidos que se generan en la DB por default (enjson, etc.)

        const spirometryDB: newSpirometry | undefined = await db 
        .insertInto("spirometries")
        .values(spirometry)
        .returningAll()
        .executeTakeFirst();

        if(spirometryDB === undefined){
            try{
                await db
                .deleteFrom("spirometries")
                .where("spirometries.id", "=", spirometryId)
                .execute();
            }
            catch(error:unknown){
                throw new Error("Espirometria fallida, no se encontro en la DataBase");
            }
            throw new Error("Espiroemtria fallida, borrada correctamente de la DataBase");
        }

        //Si la respuesta de la DB despues de guardar la espirometria es de tipo 'undefined' se considera que falló el guardado en la DB.
        //Se intenta borrar el registro, en caso de que realmente se hubiera guardado correctamente y devuelve un error.
        //Si no se habia guardado correctamente, se devuelve otro error.

        return spirometryDB;

    }
    catch(error:unknown)
    {
        console.log(error as string);
        return new Error("Error al crear la espirometria");
    }
}
