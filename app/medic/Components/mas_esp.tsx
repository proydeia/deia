import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getSpirometry } from "@/app/api/medic/spirometry";
import { Patient, Spirometry } from "@prisma/client";
import ByebyeButton from "./delSpirometryButton";
import Pag1 from "./structuralPages/Pag1";
import SpirometryList from "./structuralPages/SpirometryList";
import { getPatient } from "@/app/api/medic/patient/patient";

export default function Ver_Mas({
  Pagina,
  Page,
  EspiroId,
  pacienteId,
}: {
  Pagina: Dispatch<SetStateAction<number>>;
  Page: Dispatch<SetStateAction<number>>;
  EspiroId: number;
  pacienteId: number;
}) {
  const [spyrometry, setSpyrometry] = useState<Spirometry | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"Pag1" | "SpirometryList">("Pag1");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [activeDataTab, setActiveDataTab] = useState<"GLI" | "GOLD">("GLI");

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
          const fetchedPatient: any = await getPatient(pacienteId);
          setPatient(fetchedPatient);
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
  }, [EspiroId, pacienteId]);

  //espiroId es un string, que se utiliza para hacer la query a la db
  //En id_paciente no se estarian pasando correctamente los datos, y por eso no podemos hacer una query
  console.log(spyrometry?.obstructionaiglicategorical2);
  console.log("ola");
  return (
    <>
      <div className="mt-10 w-11/12 flex flex-col h-screen">
        {/* <div className="flex flex-row w-full justify-start items-center">
          <button
            className={`px-4 py-1 font-subtitulo font-thin ${
              activeTab === "Pag1"
                ? "border-b-2 text-secondary"
                : "border-b-0 text-secondary"
            }`}
            onClick={() => setActiveTab("Pag1")}
          >
            Información
          </button>
          <button
            className={`px-4 py-1 font-subtitulo font-thin ${
              activeTab === "SpirometryList"
                ? "border-b-2 text-secondary"
                : "border-b-0 text-secondary"
            }`}
            onClick={() => setActiveTab("SpirometryList")}
          >
            Espirometrías
          </button>
        </div> */}
        <div className="flex flex-row flex-direction-row-reverse justify-between gap-6 w-full">
          <p className="font-titulo text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4">
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
            {activeTab === "SpirometryList" && <Pag1 paciente={pacienteId} />}
            {activeTab === "Pag1" && (
              <div className="flex flex-col gap-4 justify-center items-center bg-primary_light w-full py-4 rounded-sm h-4/5">
                <div className="flex flex-col justify-between w-full items-center">
                  <div className="text-xl sm:text-2xl font-bold text-left w-full mb-2 mt-4 px-4">
                    {spyrometry.date.toDateString() || "No spirometry data"}
                  </div>
                  <div className="justify-start bg-white w-full pr-4">
                    <button
                      className={`px-4 py-1 font-subtitulo font-thin ${
                        activeDataTab === "GLI"
                          ? "border-b-2 text-secondary"
                          : "border-b-0 text-secondary"
                      }`}
                      onClick={() => setActiveDataTab("GLI")}
                    >
                      GLI
                    </button>
                    <button
                      className={`px-4 py-1 font-subtitulo font-thin ${
                        activeDataTab === "GOLD"
                          ? "border-b-2 text-secondary"
                          : "border-b-0 text-secondary"
                      }`}
                      onClick={() => setActiveDataTab("GOLD")}
                    >
                      GOLD
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-4 p-4 gap-4 justify-center overflow-y-auto h-96">
                  <div className="p-2 sm:p-4 w-max-h-10 sm:col-span-2 col-span-1 bg-white flex flex-col gap-2 justify-center items-center">
                    <p className="font-semibold text-sm text-center">FEV1:</p>
                    <p className="font-extrabold">
                      {spyrometry.fev1 || "No spirometry data"}
                    </p>
                  </div>
                  <div className="p-2 sm:p-4 w-max-h-10 sm:col-span-2 col-span-1 bg-white flex flex-col gap-2 justify-center items-center">
                    <p className="font-semibold text-sm">FVC:</p>
                    <p className="font-extrabold text-lg">
                      {spyrometry.fvc || "No spirometry data"}
                    </p>
                  </div>
                  <div className="px-2 gap-3 md:px-4 md:flex-col  flex flex-col py-2 col-span-4 bg-white justify-center items-start">
                    <p className="md:text-lg sm:text-xl font-titulo text-lg block mb-4">
                      Diagnóstico del Análisis
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <p className="md:text-lg sm:text-xl font-bold text-lg block items-center">
                        Grado de Obstruccion: (0-4)
                      </p>
                      <p className="block font-black text-lg sm:text-xl items-center justify-self-end">
                        {activeDataTab === "GLI"
                          ? spyrometry.obstructiongli
                          : spyrometry.obstructiongold || "No spirometry data"}
                      </p>
                      <p className="md:text-lg sm:text-xl font-bold text-lg items-center">
                        Posible restricción:
                      </p>
                      <p className="font-bold font-subtitulo text-lg sm:text-xl items-center justify-self-end">
                        {activeDataTab === "GLI"
                          ? spyrometry.restrictiongli > 0
                            ? "Si"
                            : "No"
                          : spyrometry.restrictiongold > 0
                          ? "Si"
                          : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="px-2 gap-3 md:px-4 md:flex-col  flex flex-col py-2 col-span-4 bg-white justify-center items-start">
                    <p className="md:text-lg sm:text-xl font-titulo text-lg block mb-4">
                      Diagnóstico de la Inteligencia Artificial
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <p className="md:text-lg sm:text-xl font-bold text-lg block items-center">
                        Grado de Obstruccion: (0-4)
                      </p>
                      <div>
                        <p className="block font-black text-lg sm:text-xl items-center justify-self-end">
                          N°1:
                          {activeDataTab === "GLI"
                            ? spyrometry.obstructionaiglicategorical1
                            : spyrometry.obstructionaigoldcategorical1 ||
                              "No spirometry data"}
                        </p>
                        <p className="block font-black text-lg sm:text-xl items-center justify-self-end">
                          N°2:
                          {activeDataTab === "GLI"
                            ? spyrometry.obstructionaiglicategorical2
                            : spyrometry.obstructionaigoldcategorical2 ||
                              "No spirometry data"}
                        </p>
                      </div>
                      <p className="md:text-lg sm:text-xl font-bold text-lg items-center">
                        Posible restricción:
                      </p>
                      <p className="font-bold font-subtitulo text-lg sm:text-xl items-center justify-self-end">
                        {activeDataTab === "GLI"
                          ? spyrometry.restrictionaigli > 0
                            ? "Si"
                            : "No"
                          : spyrometry.restrictionaigold > 0
                          ? "Si"
                          : "No"}
                      </p>
                    </div>
                  </div>
                    <div className="px-2 gap-3 md:px-4 md:flex-col font-titulo font-bold text-lg flex flex-col py-2 col-span-4 bg-white justify-center items-start">
                      Informacion Extra
                      <p className="font-subtitulo font-medium text-lg">{patient?.extrainfo}</p>
                    </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <p>No hay datos</p>
          </>
        )}
      </div>
    </>
  );
}
