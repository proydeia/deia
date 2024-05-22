"use server"
import db, { newPatient } from "../lib/db/schema";
import { uuid } from "./generateId";
const axios = require('axios').default;
const moment = require('moment');

// Datos del input medico
type patientInput = {
    name: string;
    extraInfo: string;
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
