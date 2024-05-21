"use server"
import db, {newSpirometry, newPatient, checkIfExists} from "../lib/db/schema";
const axios = require('axios').default;
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

type spirometryInput = {
    patient: string;
    fev1: Float32Array;
    fev1pred: Float32Array;
    fvc: Float32Array;
    fvcpred: Float32Array;
}


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

export async function createSpirometry(spirometryData: spirometryInput): Promise<Error | newSpirometry>{
    
    try{

        const obstruction:number = await axios.get("http://127.0.0.1:8000", spirometryData)
        .then((res:any) => {
            return res.data;
        })
        .catch((err:any) => {
            throw new Error("Error al analizar la obstruccion");
        })

        const restriction:number = await axios.get("http://127.0.0.1:8000", spirometryData)
        .then((res:any) => {
            return res.data;
        })
        .catch((err:any) => {
            throw new Error("Error al analizar la restriccion");
        })

        const date = moment().format("YYYY-MM-DD");

        const uuid = () => {
            let uuid = uuidv4();
            while(async() => await checkIfExists("spirometries", "uuid")){
                uuid = uuidv4();
            }
            return uuid;
        };

        const spirometryId = uuid();
        
        let spirometry = {
            ...spirometryData,
            id:spirometryId,
            obstruction:obstruction,
            restriction:restriction,
            date:date,
            correctionobs:-1,
            correctionobsmed:-1,
            correctionres:-1,
            correctionresmed:-1,
            enjson:false
        };
        //guardar en la base de datos
        return spirometry;
    }

    catch(e)
    {
        throw new Error("Error al analizar la obstruccion");
    }
}
