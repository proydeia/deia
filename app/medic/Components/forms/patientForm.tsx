"use client";
import FormButton from "@/app/componenetes/form_button";
import { FormEvent, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { patientFormSchema, patientState } from "$/formsDefinitions/patientFormDefinition";

interface Props {
  Pagina: Dispatch<SetStateAction<number>>;
}
export default function AgregarPacientes({ Pagina }: Props) {

  const handler = async (state: patientState, formData: FormData) => {
    //e.preventDefault();

    const validatedFields = patientFormSchema.safeParse({
      name: formData.get('name'),
      extrainfo: formData.get('extrainfo'),
      altura: Number(formData.get('altura')),
      sexo: Number(formData.get('sexo')),
      nacimiento: new Date(formData.get('nacimiento') as string),
    });

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    };

    try {
      const response = await fetch("/api/medic/patient/create", {
        method: "POST",
        body: JSON.stringify(validatedFields.data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        const { id, name } = result.newPatient;
        console.log(`Paciente ${name} creado con id ${id}.`);
        return {
          message: 'Paciente creado con éxito.' //aca hay que hacer un redirect a la pagina de paciente (usar ID proporcionaddo) y sumar a la lista (id y name proporcionafo)
        }
      };

      return {
        message: 'Error al crear Paciente.'
      }
    }

    catch (error) {
      console.log(error);
      return {
        message: 'Error al conectar con el servidor. Intente de nuevo más tarde.'
      }
    }
  };

  const [state, formAction] = useFormState(handler, undefined);
  const [name, setName] = useState<string>("");
  const [extraInfo, setExtraInfo] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (


    <div className="h-full flex flex-col justify-center items-center w-11/12 my-2">
      <div className="w-full h-1/12 bg-primary_light">f</div>
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4">
          Agregar Paciente
        </p>
        <button onClick={() => Pagina(-1)} className=" px-4 h-2/3">
          <Image
            src="/cruz_back.png"
            alt="Mi imagen"
            layout="fixed"
            width={30}
            height={30}
          />
        </button>
      </div>
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
            className="px-3 rounded-sm bg-white py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
          />
          {state?.errors?.name && <p>{state.errors.name}</p>}
        </label>
        <div className="sm:grid-cols-2 grid-cols-1 grid w-11/12 gap-2 justify-center">
          <div>

            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">Fecha de Nacimiento</h1>
              <input
                type="date"
                id="nacimiento"
                name="nacimiento"
                className=" px-3 rounded-sm bg-white py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
              {state?.errors?.nacimiento && <p>{state.errors.nacimiento}</p>}
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">Altura (cm)</h1>
              <input
                type="number"
                step={0.01}
                id="altura"
                name="altura"
                className="px-3 rounded-sm bg-white py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
              {state?.errors?.altura && <p>{state.errors.altura}</p>}
            </label>
          </div>

          <div>
            <h1 className="text-sm font-light text-third">Sexo Biologico</h1>
            <div className="flex flex-row justify-between  px-3 py-2.5 w-full rounded-sm border-0 border-b-2 border-secondary focus:outline-none bg-white">
              <div className="flex items-center justify-start gap-2">
                <h1 className="text-sm font-light text-third ml-2 ">
                  Masculino
                </h1>
                <input
                  type="radio" //poner boton tipo radial para elegir entre femenino y masculino. Valores 0 y 1 respectivamente.
                  id="male"
                  name="sexo"
                  className="mr-2 px-3 rounded-sm bg-primary w-4 h-4   border-third focus:ring-primary_light focus:ring-2"
                  value={2}
                />
              </div>
              <div className="flex items-center justify-start gap-2 ">
                <h1 className="text-sm font-light text-third ml-2 ">
                  Femenino
                </h1>
                <input
                  type="radio" //poner boton tipo radial para elegir entre femenino y masculino. Valores 0 y 1 respectivamente.
                  id="female"
                  name="sexo"
                  className="mr-2 px-3 rounded-sm bg-primary w-4 h-4 border-third focus:ring-primary_light focus:ring-2"
                  value={1}
                />
              </div>
            </div>
            {state?.errors?.sexo && <p>{state.errors.sexo}</p>}
          </div>
          <div className="col-span-2 w-full">
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">Extra info</h1>
              <input
                type="text"
                id="extrainfo"
                name="extrainfo"
                className="px-3 rounded-sm bg-primary py-4 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>

            <div>
              <label className="col-span-2 w-full">
                <h1 className="text-sm font-light text-third">DNI</h1>
                <input
                  type="text"
                  // id="extrainfo"
                  // name="extrainfo"
                  className=" px-3 rounded-sm bg-white py-2  w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
                />
                {/* {state?.errors?.extrainfo && <p>{state.errors.extrainfo}</p>} */}
              </label>
            </div>
          <div className="w-11/12 ">
            <label >
              <h1 className="text-sm font-light text-third">Extra info</h1>
              <input
                type="text"
                id="extrainfo"
                name="extrainfo"
                className=" px-3 rounded-sm bg-white py-2  w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
              {state?.errors?.extrainfo && <p>{state.errors.extrainfo}</p>}
            </label>
          </div>
        </div>
        {/* <button onClick={() => Pagina("1")}>Volver</button> */}
        {/* <AgregarEspiro/> */}
        {state?.message && <p>{state.message}</p>}
        <FormButton />
      </form>
    </div>
  );
}
