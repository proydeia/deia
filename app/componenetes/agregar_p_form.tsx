"use client";
import FormButton from "./form_button";
import { useState } from "react";
import { createPacient } from "../api/patient";

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

async function miFunc(name: string, extraInfo: string) {
  try {
    const patientData: PatientInput = { name, extraInfo };
    const newPatient: Patient = await createPacient(patientData);
    console.log(newPatient);
  } catch (error) {
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
    } catch (error) {}
  };

  return (
    <div className="h-full flex flex-col justify-center items-center w-11/12 ">
      <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4">
        Agregar Paciente
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-10/12 sm:w-full bg-primary_light rounded-sm flex flex-col justify-center items-center gap-4 overflow-y-auto"
      >
        <label htmlFor="name" className="w-11/12 mt-4">
          <h1 className="text-sm font-light text-third">Nombre y Apellido</h1>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
          />
        </label>
        <label htmlFor="extraInfo" className="w-11/12">
          <h1 className="text-sm font-light text-third">Información Extra</h1>
          <input
            type="text"
            id="extra"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            className="px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
          />
        </label>
        <label className="w-11/12">
          <h1 className="text-sm font-light text-third">DNI</h1>
          <input
            type="text"
            id="extra"
            className="px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
          />
        </label>
        <div className="grid-cols-2 grid w-11/12 gap-2 justify-center">
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">
                Fecha de Nacimiento
              </h1>
              <input
                type="date"
                id="extra"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">Peso (kg)</h1>
              <input
                type="number"
                id="extra"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">Altura (m)</h1>
              <input
                type="number"
                id="extra"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">Sexo Biológico</h1>
              <input
                type="text"
                id="extra"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
        </div>
        <FormButton />
      </form>
    </div>
  );
}
