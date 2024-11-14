import { useState, useEffect } from "react";
import { Patient, Spirometry } from "@/app/lib/dbSchema/schema";
import { getPatient } from "@/app/api/medic/patient";
import { getSpirometryList } from "@/app/api/medic/spirometry";
import Instrucciones from "./instrucciones";
import ByebyeButton from "../delSpirometryButton";
import Pag1 from "./Pag1";
import SpirometryList from "./SpirometryList";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface Props {
  pacienteId: number;
  Pagina: Dispatch<SetStateAction<number>>;
  Page: Dispatch<SetStateAction<number>>;
  Espiro: Dispatch<SetStateAction<number>>;
}

export default function Id_paciente({ pacienteId, Pagina, Page, Espiro }: Props) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [spirometries, setSpirometries] = useState<Spirometry[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'Pag1' | 'SpirometryList'>('Pag1');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (pacienteId) {
        try {
          const fetchedPatient: any = await getPatient(pacienteId);
          setPatient(fetchedPatient);
          const fetchedSpirometries: any[] = await getSpirometryList(pacienteId);
          setSpirometries(fetchedSpirometries);
        } catch (error) {
          console.error("Error fetching patient:", error);
          setPatient(null);
        } finally {
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [pacienteId]);

  const NavigetoVer_Mas = (Id: number) => {
    Page(3);
    Espiro(Id);
  };

  return (
    <main className="w-full flex justify-center">
      {isLoading ? (
        <Instrucciones />
      ) : !pacienteId ? (
        <p>Elija un Paciente o cree uno.</p>
      ) : patient ? (
        <div className="flex flex-col w-11/12 justify-center mt-14 items-center bg-primary_light">
          <div className="flex flex-row w-full justify-start  items-center ">
            <button
              className={`px-4 py-1 font-subtitulo font-thin   ${activeTab === 'Pag1' ? 'border-b-2 text-secondary' : 'border-b-0 text-secondary'}`}
              onClick={() => setActiveTab('Pag1')}
            >
              Información 
            </button>
            <button
              className={`px-4 py-1 font-subtitulo font-thin   ${activeTab === 'SpirometryList' ? 'border-b-2 text-secondary' : 'border-b-0  text-secondary'}`}
              onClick={() => setActiveTab('SpirometryList')}
            >
              Espirometrías
            </button>
          </div>
          <div className="flex flex-row flex-direction-row-reverse justify-between bg-secondary gap-6 w-full ">
            <p className="text-2xl sm:text-3xl font-bold text-left text-primary w-full mb-4 mt-4">
              {patient.name}
            </p>
            <div className="flex flex-row items-center justify-center">
              {/* {activeTab === 'SpirometryList' ? return(
                
              <button
                onClick={() => Pagina(-1)}
                className="px-4 h-2/3 hover:animate-spin animate-duration-100 animate-once animate-ease-in-out animate-normal"
              >
                <Image
                  src="/cruz_back.png"
                  alt="Mi imagen"
                  layout="fixed"
                  width={30}
                  height={30}
                />
              </button>
              ): {
                return(
                  <p>ola</p>
                )
              }} */}
            </div>
          </div>


          {activeTab === 'Pag1' && <Pag1 paciente={patient} />}
          {activeTab === 'SpirometryList' && spirometries && (
            <SpirometryList spirometries={spirometries} onVerMas={NavigetoVer_Mas} />
          )}
          <div className={`${activeTab === 'SpirometryList' ? 'hidden' : 'block'}`}>
           
            <ByebyeButton tabla={"patient"} id={pacienteId} />
            </div>
            <button
               className={`bg-secondary text-md p-2 ml-2 rounded-lg my-2 ${activeTab === 'SpirometryList' ? 'block' : 'hidden'}`}
              onClick={() => Page(0)}
            >
              Agregar Espirometrías
            </button>
        </div>

      ) : (
        <p>Paciente no encontrado</p>
      )}
    </main>
  );
}
