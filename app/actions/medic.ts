"use server"
import db, {newSpirometry, newPatient, checkIfExists} from "../lib/db/schema";
const axios = require('axios').default;
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

// Datos del input medico
type spirometryInput = {
    patient: string;
    fev1: number;
    fev1pred: number;
    fvc: number;
    fvcpred: number;
}

// ID
const uuid = async() => {
    let uuid = uuidv4();
    while(await checkIfExists("spirometries", "uuid")){
        uuid = uuidv4();
        console.log("uuid");
    }
    return uuid;
};


// Pacientes

export async function getPatientsList(medicId:string){
    const patients = await db
    .selectFrom("patients")
    .where("patients.medic", "=", medicId)
    .select(["id", "name"])
    .execute();
    
    return patients;
}

export async function getPatient(patientId:string){
    const patient = await db
    .selectFrom("patients")
    .where("patients.id", "=", patientId)
    .executeTakeFirst();

    return patient;
}

export async function createPatient(patientData:newPatient ): Promise<Error | {}>{
    return {}
}


// Espirometrias

export async function getSpirometriesList(patientId:string){
    const spirometries = await db
    .selectFrom("spirometries")
    .where("spirometries.patient", "=", patientId)
    .select(["id", "obstruction", "restriction", "date"])
    .execute();
    
    return spirometries;
}

export async function getSpirometry(spirometryId:string){
    const spirometry = await db
    .selectFrom("spirometries")
    .where("spirometries.id", "=", spirometryId)
    .executeTakeFirst();

    return spirometry;
}

export async function createSpirometry(spirometryData: spirometryInput): Promise<Error | newSpirometry | undefined>{
    
    try{
        
        const obstruction:number = await axios.post("http://127.0.0.1:8000/obstruction", spirometryData)
        .then((res:any) => {
            return res.data.result; //devuelve el analisis obstructivo.
        })
        .catch((err:any) => {
            throw new Error("Error al analizar la obstruccion");
        })

        const restriction:number = await axios.post("http://127.0.0.1:8000/restriction", spirometryData)
        .then((res:any) => {
            return res.data.result; //devuelve el analisis restrictivo.
        })
        .catch((err:any) => {
            throw new Error("Error al analizar la restriccion");
        })

        const date = moment().format("YYYY-MM-DD"); //genera fecha actual.

        const spirometryId = await uuid(); // genera un UUID único.	
        
        const spirometry: newSpirometry = {
            ...spirometryData,
            id:spirometryId,
            obstruction:obstruction,
            restriction:restriction,
            date:date
        }; //crea el objeto spirometry con los datos de entrada, los del analisis, la fecha y el UUID.

        const spirometryDB = await db 
        .insertInto("spirometries")
        .values(spirometry)
        .returningAll()
        .executeTakeFirst();

        //guarda todos los datos en la DB y los devuelve, en conjunto 
        //con los no incluidos que se generan en la DB por default (enjson, etc.)

        return spirometryDB;

    }
    catch(error:any)
    {
        throw new Error(error as string);
    }
}
