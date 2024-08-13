import { Dispatch, SetStateAction } from "react";
import Volver_btn from "./volver_btn";
import Image from "next/image";
import { Spirometry } from "@/app/lib/db/schema";
import { useState, useEffect } from "react";
import { Patient } from "@/app/lib/db/schema";
import { getSpirometriesList, getSpirometry } from "@/app/api/spirometry";
export default function Ver_Mas({
  Pagina,
  Page,
  pacienteId,
  EspiroId
}: {
  Pagina: Dispatch<SetStateAction<string>>;
  Page: Dispatch<SetStateAction<string>>;
  EspiroId: string;
  pacienteId: string;
}) {
  const [spyrometry, setSpyrometry] = useState<Spirometry | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (EspiroId) {
        try {
          const fetchedSpirometry: Spirometry = await getSpirometry(EspiroId);
          const fetchSpirometry = async () => {
            //terminar de arreglar esto a primera hora
            setSpyrometry(fetchedSpirometry);
          };
          fetchSpirometry();
        } catch (error) {
          console.error("Error fetching spirometry:", error);
        } finally {
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, [EspiroId]);

  useEffect(() => {
    console.log("Este es el    "+EspiroId);
  }, [EspiroId]);

//espiroId es un string, que se utiliza para hacer la query a la db
//En id_paciente no se estarian pasando correctamente los datos, y por eso no podemos hacer una query

console.log("Este es el objeto"+EspiroId)
  return (
    <div className="w-11/12 flex flex-col h-screen">
      <div className="flex flex-row flex-direction-row-reverse justify-between gap-6 w-full">
        <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4">
          Datos Extra
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

      {/* <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4 px-4">Datos del Diagnóstico</p> */}
      {isLoading ? (
          <p>Cargando...</p>
        ) : spyrometry ? (
          <>
            {/* Datos de la espirometría */}
            
               <div  className=" flex flex-col gap-4 justify-center items-center bg-primary_light py-4 rounded-sm h-4/5">
               <p className="text-xl sm:text-2xl font-bold text-left w-full mb-2 mt-4 px-4">
                 {spyrometry.date.toDateString() || "No spirometry data"}
               </p>
               <div className="grid grid-cols-4 p-4 gap-4 justify-center overflow-y-auto h-96">
                 <div className="p-4  sm:p-8 w- max-h-10 sm:col-span-1  col-span-2 bg-primary flex flex-col gap-2 justify-center items-center">
                   <p className="font-semibold text-sm text-center">FEV1:</p>
                   <p className="font-extrabold">
                     {spyrometry.fev1 || "No spirometry data"}
                   </p>
                 </div>
                 <div className="p-4  sm:p-8 w- max-h-10 sm:col-span-1  col-span-2 bg-primary flex flex-col gap-2 justify-center items-center">
                   <p className="font-semibold text-sm">FEV1 LLN:</p>
                   <p className="font-extrabold text-lg">
                     {spyrometry.fev1pred || "No spirometry data"}
                   </p>
                 </div>
                 <div className="p-4  sm:p-8 w- max-h-10 sm:col-span-1  col-span-2 bg-primary flex flex-col gap-2 justify-center items-center">
                   <p className="font-semibold text-sm">FVC:</p>
                   <p className="font-extrabold text-lg">
                     {spyrometry.fvc|| "No spirometry data"}
                   </p>
                 </div>
                 <div className="p-4  sm:p-8 w- max-h-10 sm:col-span-1  col-span-2 bg-primary flex flex-col gap-2 justify-center items-center">
                   <p className="font-semibold text-sm">FVC LLN:</p>
                   <p className="font-extrabold text-lg">
                     {spyrometry.fvcpred || "No spirometry data"}
                   </p>
                 </div>
                 <div className="px-2 md:px-4 md:flex-row  flex flex-col py-2  col-span-4  bg-primary justify-between">
                   <p className="md:text-lg sm:text-xl font-semibold text-lg">
                     Grado de Obstruccion por Análisis:
                   </p>
                   <p className=" g font-extrabold text-xl  sm:text-2xl">
                     {spyrometry.obstruction || "No spirometry data"}
                   </p>
                 </div>
                 <div className="px-2 md:px-4 md:flex-row  flex flex-col py-2  col-span-4  bg-primary justify-between">
                   <p className="md:text-lg sm:text-xl font-semibold text-lg">
                     Grado de Obstruccion por IA:
                   </p>
                   <p className=" g font-extrabold text-xl  sm:text-2xl">
                     {spyrometry.obstructionia || "No spirometry data"}
                   </p>
                 </div>
                 <div className="px-2 md:px-4 md:flex-row  flex flex-col py-2  col-span-4  bg-primary justify-between">
                   <p className="md:text-lg sm:text-xl font-semibold text-lg">
                     Obstrucción según el Análisis:{spyrometry.restriction}
                   </p>
                   <p className=" font-bextraold text-xl  sm:text-2xl">
                     {spyrometry.obstructionia > 0 ? (
                       <p>Si</p>
                     ) : (
                       <p>No</p>
                     )}
                   </p>
                 </div>
                 <div className="px-2 md:px-4 md:flex-row  flex flex-col py-2  col-span-4  bg-primary justify-between">
                   <p className="md:text-lg sm:text-xl font-semibold text-lg">
                     Probabilidad de que haya restriccion :{spyrometry.restrictionai}
                   </p>
                   <p className=" font-bextraold text-xl  sm:text-2xl">{spyrometry.restrictionai> 0 ? (
                       <p>Si</p>
                     ) : (
                       <p>No</p>
                     )}</p>
                 </div>
       
                 <div className="bg-primary col-span-4 p-4">
                   <p className="font-bold text-lg sm:text-xl">Información Extra:</p>
                   <p className="sm:text-xl font-medium text-lg">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                     enim ad minim veniam, quis nostrud exercitation ullamco laboris
                     nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                     reprehenderit in voluptate velit esse cillum dolore eu fugiat
                     nulla pariatur.{" "}
                   </p>
                 </div>
               </div> 
            </div>
            
            </>
        ) :(
            <p>No hay datos</p>
        )}
    </div>
  );
}
