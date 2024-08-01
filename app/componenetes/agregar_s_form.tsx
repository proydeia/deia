
"use client";
import FormButton from "./form_button";
import Volver_btn from "../authorized/Components/volver_btn";
import { Dispatch, SetStateAction } from "react";                                                     //AGREGAR LUEGO LOS DATOS DE LAS ESPIROMETRIAS
import { useFormState } from "react-dom";
import { createSpirometry } from "../api/spirometry";

export default function AgregarEspiro({Pagina, id, altura, sexo, peso}:{ Pagina: Dispatch<SetStateAction<string>>, id: string, altura: number, sexo: number, peso: number } ) {
  const [state, formAction] = useFormState(createSpirometry, undefined);

  return (
    <main className="h-full flex flex-col justify-center items-center w-11/12 ">
        <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4">
          Agregar Espirometría
        </p>

        <Volver_btn Pagina={() => Pagina("default")}/>
      
        <form
          action={formAction}
          className="w-10/12 sm:w-full bg-primary_light rounded-sm flex flex-col justify-center items-center gap-4 overflow-y-auto"
        >
       
          <div className="grid-cols-2 grid w-11/12 gap-2 justify-center ">
            
            <input type="hidden" id="id" name="id" value={id}/>{/* esto es para pasar el ID */}
            <input type="hidden" id="sexo" name="sexo" value={sexo}/>{/* esto es para pasar el ID */}
            <input type="hidden" id="altura" name="altura" value={altura}/>{/* esto es para pasar el ID */}
            <input type="hidden" id="peso" name="peso" value={peso}/>{/* esto es para pasar el ID */}
            
            <div>
            
              <label className="w-11/12">
                <h1 className="text-sm font-light text-third">FEV1</h1>
                <input
                  type="number"
                  id="fev1"
                  name="fev1"
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
        <FormButton />
      </form>
    </main>
  );
}
