import FormButton from "./form_button";
import Volver_btn from "../authorized/Components/volver_btn";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
// const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       miFunc(name, extraInfo);
//     } catch (error) {}
//   };
//                                                      AGREGAR LUEGO LOS DATOS DE LAS ESPIROMETRIAS

export default function AgregarEspiro({ Pagina, Page }: {
  Pagina: Dispatch<SetStateAction<string>>
  Page: Dispatch<SetStateAction<string>>
}) {
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
      {/* <Volver_btn Pagina={() => Pagina("default")} /> */}
      <form
        // onSubmit={handleSubmit}
        className="w-10/12 sm:w-full bg-primary_light rounded-sm flex flex-col justify-center items-center gap-4 overflow-y-auto"
      >

        <div className="grid-cols-2 grid w-11/12 gap-2 justify-center mt-4">
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">FEV1</h1>
              <input
                type="number"
                id="fev1"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">FEV1 LLN</h1>
              <input
                type="number"
                id="fev1L"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">FVC</h1>
              <input
                type="number"
                id="fvc"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="w-11/12">
              <h1 className="text-sm font-light text-third">FVC LLN</h1>
              <input
                type="number"
                id="fvcL"
                className=" px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
              />
            </label>
          </div>

        </div>
        <label className="w-11/12">
          <h1 className="text-sm font-light text-third">Información Extra</h1>
          <input
            type="text"
            id="extraI"
            className="px-3 rounded-sm bg-primary py-2 w-full focus:ring-0 border-0 border-b-2 border-secondary focus:outline-none"
          />
        </label>
        <FormButton />

      </form>
    </main>
  );
}
