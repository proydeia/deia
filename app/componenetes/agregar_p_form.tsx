'use client'
import FormButton from "./form_button";
import { useState } from "react";
import { createPatient } from "../api/patient";

interface PatientInput {
  name: string;
  extraInfo: string;
}

interface Patient {
  id: string;
  name: string;
  extrainfo: string;
  medic: string;
}

async function miFunc(name:string, extraInfo:string) {
  try {
    const patientData: PatientInput = { name, extraInfo };
    const newPatient: Patient = await createPatient(patientData);
    console.log(newPatient)
  }

  catch (error) {
    console.error("Error creating patient:", error);
  }
}

export default function AgregarPacientes() {

  const [name, setName] = useState<string>("");
  const [extraInfo, setExtraInfo] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    try {
      miFunc(name, extraInfo);
    
    } catch (error){

    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="w-10/12 sm:w-full bg-primary_light h-3/4 rounded-sm flex flex-col justify-center items-center gap-4">
        <p className="text-2xl sm:text-3xl font-bold text-left w-11/12">Form</p>
        <label htmlFor="name">
          <h1 className="text-sm font-light text-third">Nombre y Apellido</h1>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingrese Nombre y Apellido"
            className="px-3 rounded-md py-2"
          />
        </label>
        <label htmlFor="extraInfo">
          <h1 className="text-sm font-light text-third">Información Extra</h1>
          <input
            type="text"
            id="extra"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            placeholder="Ingrese Informacion Extra"
            className="px-3 rounded-md py-2"
          />
        </label>
        <label className="flex flex-col grid-cols-2 gap-2">
          <h1 className="text-sm font-light text-third">Valores Espirometría</h1>
          <div className="flex flex-col gap-2 sm:flex-row items-center justify-center">

            <input
              className="px-3 rounded-md py-2 w-full sm:w-1/2"
              placeholder="Valor 1" />
            <input
              className="px-3 rounded-md py-2 w-full sm:w-1/2"
              placeholder="Valor 2" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row items-center justify-center">
            <input
              className="px-3 rounded-md py-2 w-full sm:w-1/2"
              placeholder="Valor 3" />
            <input
              className="px-3 rounded-md py-2 w-full sm:w-1/2"
              placeholder="Valor 4" />
          </div>
        </label>
        <FormButton />
      </form>
    </div>
  );
}
