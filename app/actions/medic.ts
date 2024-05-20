"use server"
import db from "../lib/db/schema";


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

export async function createSpirometry(spirometryData:{}){
    const spirometry = await fetch('http://127.0.0.1:8000', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })    
    console.log(123,spirometry);
    return spirometry;
}
