"use server"
import db, { newPatient, Patient } from "../lib/db/schema";
import { uuid } from "./generateId";
import { userId } from "./token";

// Datos del input medico

type patientInput = {
    name: string;
    extraInfo: string;
}

// Pacientes

export async function getPatientsList(): Promise < Patient[] > {
    try{
        const id = await userId();
        if(id == undefined) throw new Error;

        const patients = await db
        .selectFrom("patients")
        .where("patients.medic", "=", id)
        .selectAll()
        .execute();
        
        return patients;
    }
    catch(errror:unknown){
        throw new Error("Error al buscar pacientes");
    }
}

export async function getPatient(patientId:string): Promise < Patient > {
    try{
        const id = await userId();
        if(id == undefined) throw new Error;
        
        const patient = await db
        .selectFrom("patients")
        .selectAll()
        .where("patients.id", "=", patientId)
        .where("patients.medic", "=", id)
        .executeTakeFirst();

        if(!patient) return {} as Patient;

        return patient;

    }
    catch(error:unknown){
        throw new Error("Error al buscar paciente");
    }
}

export async function createPatient(patientData:patientInput): Promise < newPatient > {
    try{
        const medId = await userId();
        if(medId == undefined) throw new Error;

        const id = await uuid("patients")

        const patient: newPatient = await db
        .insertInto("patients")
        .values({
            id: id,
            name: patientData.name,
            extrainfo: patientData.extraInfo,
            medic: medId,
        })
        .returningAll()
        .executeTakeFirstOrThrow()
        return patient
    }
    catch(error: unknown){
        throw new Error("Error al crear paciente");
    }
}
