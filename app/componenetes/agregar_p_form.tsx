"use client";
import FormButton from "./form_button";
import { useState } from "react";
import { createPatient } from "../api/patient";
import { Dispatch, SetStateAction } from "react";
import { useFormState } from "react-dom";
import AgregarEspiro from "./agregar_s_form";
import Volver_btn from "../authorized/Components/volver_btn";

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


interface Props {
  Pagina: Dispatch<SetStateAction<string>>;
}
export default function AgregarPacientes({ Pagina }: Props) {
  const [state, formAction] = useFormState(createPatient, undefined);

  const [name, setName] = useState<string>("");
  const [extraInfo, setExtraInfo] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col justify-center items-center w-11/12 my-2">
      <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4">
        Agregar Paciente
      </p>
      <form
        action={formAction}
        className="w-10/12 sm:w-full bg-primary_light rounded-sm flex flex-col justify-center items-center gap-4 overflow-y-auto"
      >
        <label htmlFor="name" className="w-11/12 mt-4">
          <h1 className="text-sm font-light text-third">Nombre y Apellido</h1>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
            />
            {state?.errors?.name && <p>{state.errors.name}</p>}
        </label>
        <label className="w-11/12">
          <h1 className="text-sm font-light text-third">
              Fecha de Nacimiento
          </h1>
          <input
              type="date"
              id="nacimiento"
              name="nacimiento"
              className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
          />
            {state?.errors?.nacimiento && <p>{state.errors.nacimiento}</p>}
        </label>
        <div className="sm:grid-cols-2 grid-cols-1 grid w-11/12 gap-2 justify-center">
          <div>
          <label className="w-11/12">
          <h1 className="text-sm font-light text-third">Altura</h1>
          <input
            type="number"
            step={0.01}
            id="altura"
            name="altura"
            className="px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
          />
            {state?.errors?.altura && <p>{state.errors.altura}</p>}

        </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">Peso (kg)</h1>
              <input
                type="number"
                step={0.01}
                id="peso"
                name="peso"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            {state?.errors?.peso && <p>{state.errors.peso}</p>}

            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">Sexo Biologico</h1>
              <input
                type="number" //poner boton tipo radial para elegir entre femenino y masculino. Valores 0 y 1 respectivamente.
                id="sexo"
                name="sexo"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            {state?.errors?.sexo && <p>{state.errors.sexo}</p>}
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">Extra info</h1>
              <input
                type="text"
                id="extraInfo"
                name="extrainfo"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            {state?.errors?.extraInfo && <p>{state.errors.extraInfo}</p>}
            </label>
          </div>
        </div>
        <button onClick={() => Pagina("1")}>Volver</button>
        {/* <AgregarEspiro/> */}
        <FormButton />
      </form>
      {state?.message && <p>{state.message}</p>}
    </div>
    
  );
}
