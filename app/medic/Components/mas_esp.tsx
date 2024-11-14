import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getSpirometry } from "@/app/api/medic/spirometry";
import ByebyeButton from "./delSpirometryButton";
import Pag1 from "./structuralPages/Pag1";
import SpirometryList from "./structuralPages/SpirometryList";
export default function Ver_Mas({
  Pagina,
  Page,
  EspiroId
}: {
  Pagina: Dispatch<SetStateAction<number>>;
  Page: Dispatch<SetStateAction<number>>;
  EspiroId: number;
  pacienteId: number;
}) {
  const [spyrometry, setSpyrometry] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'Pag1' | 'SpirometryList'>('Pag1');
  useEffect(() => {
    const fetchData = async () => {
      console.log(EspiroId);
      setIsLoading(true);
      if (EspiroId) {
        try {
          const fetchedSpirometry = await getSpirometry(EspiroId);
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

  //espiroId es un string, que se utiliza para hacer la query a la db
  //En id_paciente no se estarian pasando correctamente los datos, y por eso no podemos hacer una query

  return (
    <div className="mt-10 w-11/12 flex flex-col h-screen">
           <div className="flex flex-row w-full justify-start items-center">
        <button
          className={`px-4 py-1 font-subtitulo font-thin ${activeTab === 'Pag1' ? 'border-b-2 text-secondary' : 'border-b-0 text-secondary'}`}
          onClick={() => setActiveTab('Pag1')}
        >
          Información 
        </button>
        <button
          className={`px-4 py-1 font-subtitulo font-thin ${activeTab === 'SpirometryList' ? 'border-b-2 text-secondary' : 'border-b-0 text-secondary'}`}
          onClick={() => setActiveTab('SpirometryList')}
        >
          Espirometrías
        </button>
      </div>
      <div className="flex flex-row flex-direction-row-reverse justify-between gap-6 w-full">
        <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4">
          Datos Extra
        </p>
        <div className="flex flex-row items-center justify-center">
          <button onClick={() => Page(-1)}>
            <Image
              src="/flexa_back.png"
              alt="Flecha"
              layout="fixed"
              width={30}
              height={30}
            />
          </button>
          <button onClick={() => Pagina(-1)} className="px-4 h-2/3">
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

      {isLoading ? (
        <p>Cargando...</p>
      ) : spyrometry ? (
        <>
          {/* {activeTab === 'Pag1' && <Pag1 paciente={spyrometry} />} */}
          {activeTab === 'SpirometryList' && (
            <div className="flex flex-col gap-4 justify-center items-center bg-primary_light py-4 rounded-sm h-4/5">
              <div className="flex flex-row justify-between w-full items-center">
                <div className="text-xl sm:text-2xl font-bold text-left w-full mb-2 mt-4 px-4">
                  {spyrometry.date.toDateString() || "No spirometry data"}
                </div>
                <div className="justify-center pr-4">
                </div>
              </div>
              <div className="grid grid-cols-4 p-4 gap-4 justify-center overflow-y-auto h-96">
                <div className="p-4 sm:p-8 w-max-h-10 sm:col-span-1 col-span-2 bg-primary flex flex-col gap-2 justify-center items-center">
                  <p className="font-semibold text-sm text-center">FEV1:</p>
                  <p className="font-extrabold">
                    {spyrometry.fev1 || "No spirometry data"}
                  </p>
                </div>
                <div className="p-4 sm:p-8 w-max-h-10 sm:col-span-1 col-span-2 bg-primary flex flex-col gap-2 justify-center items-center">
                  <p className="font-semibold text-sm">FVC:</p>
                  <p className="font-extrabold text-lg">
                    {spyrometry.fvc || "No spirometry data"}
                  </p>
                </div>
                <div className="px-2 md:px-4 md:flex-row flex flex-col py-2 col-span-4 bg-primary justify-between">
                  <p className="md:text-lg sm:text-xl font-semibold text-lg">
                    Grado de Obstruccion por Análisis:
                  </p>
                  <p className="g font-extrabold text-xl sm:text-2xl">
                    {spyrometry.obstruction !== undefined || spyrometry.obstruction === Number(0) ? (spyrometry.obstruction) : ("No spirometry data")}
                  </p>
                </div>
                <div className="px-2 md:px-4 md:flex-row flex flex-col py-2 col-span-4 bg-primary justify-between">
                  <p className="md:text-lg sm:text-xl font-semibold text-lg">
                    Grado de Obstruccion por IA:
                  </p>
                  <p className="g font-extrabold text-xl sm:text-2xl">
                    {spyrometry.obstructionai || "No spirometry data"}
                  </p>
                </div>
                <div className="px-2 md:px-4 md:flex-row flex flex-col py-2 col-span-4 bg-primary justify-between">
                  <p className="md:text-lg sm:text-xl font-semibold text-lg">
                    Posible restricción según el Análisis:
                  </p>
                  <p className="font-bextraold text-xl sm:text-2xl">
                    {spyrometry.restriction > 0 ? (
                      <p>Si</p>
                    ) : (
                      <p>No</p>
                    )}
                  </p>
                </div>
                <div className="px-2 md:px-4 md:flex-row flex flex-col py-2 col-span-4 bg-primary justify-between">
                  <p className="md:text-lg sm:text-xl font-semibold text-lg">
                    Posible restricción por IA:
                  </p>
                  <p className="font-bextraold text-xl sm:text-2xl">{spyrometry.restrictionai > 0 ? (
                    <p>Si</p>
                  ) : (
                    <p>No</p>
                  )}</p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <p>{spyrometry}</p>
          <p>No hay datos</p>
        </>
      )}
    </div>
  );
}
