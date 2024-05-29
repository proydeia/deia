"use server"
import db, { newPatient, Patient } from "../lib/db/schema";
import { uuid } from "./generateId";
const axios = require('axios').default;
const moment = require('moment');

// Datos del input medico
type patientInput = {
    name: string;
    extraInfo: string;
}

// Pacientes

export async function getPatientsList(medicId:string): Promise < Patient[] | Error > {
    try{
        const patients = await db
        .selectFrom("patients")
        .where("patients.medic", "=", medicId)
        .selectAll()
        .execute();
        
        return patients;
    }
    catch(errror:unknown){
        return new Error("Error al buscar los pacientes");
    }
}

export async function getPatient(patientId:string): Promise < Patient | Error > {
    try{
        const patient = await db
        .selectFrom("patients")
        .selectAll()
        .where("patients.id", "=", patientId)
        .executeTakeFirst();

        if(!patient) return {} as Patient;

        return patient;

    } catch(error:unknown){
        return new Error("Error al buscar el paciente");
    }
}

export async function createPatient(patientData:newPatient ): Promise<Error | {}>{
    return {}
}
