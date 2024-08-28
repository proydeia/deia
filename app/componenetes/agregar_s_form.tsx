
"use client";
import FormButton from "./form_button";
import { Dispatch, SetStateAction } from "react";                                                     //AGREGAR LUEGO LOS DATOS DE LAS ESPIROMETRIAS
import { useFormState } from "react-dom";
import { createSpirometry } from "../api/spirometry";
import Image from "next/image";
export default function AgregarEspiro({Pagina, id, Page}:{ Pagina: Dispatch<SetStateAction<string>>, id: string, Page: Dispatch<SetStateAction<string>>} ) {
  const [state, formAction] = useFormState(createSpirometry, undefined);

  return (
    <main className="h-full flex flex-col justify-center items-center w-11/12 ">
      <div className="flex flex-row flex-direction-row-reverse justify-between gap-6 w-full">

          <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4">
            Agregar Espirometría
          </p>

          <div className="flex flex-row items-center justify-center">
          <button onClick={() => Page("1")}>
            <Image
              src="/flexa_back.png"
              alt="Flecha"
              layout="fixed"
              width={30}
              height={30}
            />
          </button>
          <button onClick={() => Pagina("1")} className=" px-4 h-2/3">
            <Image
              src="/cruz_back.png"
              alt="Mi imagen"
              layout="fixed"
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>
      
        <form
          action={formAction}
          className="w-10/12 sm:w-full bg-primary_light rounded-sm flex flex-col justify-center items-center gap-4 overflow-y-auto"
        >

          <div className="grid-cols-2 grid w-11/12 gap-2 justify-center mt-4">
            
            <input type="hidden" id="id" name="id" value={id}/>{/* esto es para pasar el ID */}
            
            <div>
            
              <label className="w-11/12">
                <h1 className="text-sm font-light text-third">FEV1</h1>
                <input
                  type="number"
                  id="fev1"
                  name="fev1"
                  step={.1}
                  className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
                />
            
                {state?.errors?.fev1 && <p>{state.errors.fev1}</p>}
              </label>
            </div>
        
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">FEV1 LLN</h1>
              <input
                type="number"
                id="fev1_lln"
                name="fev1_lln"
                step={.1}
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />

              {state?.errors?.fev1_lln && <p>{state.errors.fev1_lln}</p>}
            </label>
          </div>

          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">FVC</h1>
              <input
                type="number"
                id="fvc"
                name="fvc"
                step={.1}
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />

              {state?.errors?.fvc && <p>{state.errors.fvc}</p>}
            </label>
          </div>

          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">FVC LLN</h1>
              <input
                type="number"
                id="fvc_lln" 
                name="fvc_lln" 
                step={.1}
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />

              {state?.errors?.fvc_lln && <p>{state.errors.fvc_lln}</p>}
            </label>
          </div>

        </div>
        {/* <label className="w-11/12">
          <h1 className="text-sm font-light text-third">Información Extra</h1>
          <input
            type="text"
            id="extraI"
            className="px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
          />
        </label> */}
        {state?.message && <p>{state.message}</p>}
        <FormButton />

      </form>
    </main>
  );
}
