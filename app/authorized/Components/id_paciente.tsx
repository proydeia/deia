import { useState, useEffect } from "react";
import { Patient } from "@/app/lib/db/schema";
import { getPatient } from "@/app/api/patient";
import { getSpirometriesList } from "@/app/api/spirometry";
import { Spirometry } from "@/app/lib/db/schema";
import Instrucciones from "./instrucciones";
import ByebyeButton from "./byebyeButton";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
interface Props {
  pacienteId: string; // ID passed as a prop
  Pagina: Dispatch<SetStateAction<string>>;
  Page: Dispatch<SetStateAction<string>>;
}
interface SpirometryButtonProps {
  onClick: () => void;
  // SpiroData: Spirometry; // Pass SpiroData as a prop
}
const VerMasButton = ({ onClick }: SpirometryButtonProps) => {
  return (
    <button
      className="bg-primary_light rounded-sm h-1/2 p-2 ml-auto"
      onClick={onClick}
      
    >
      Ver Mas
    </button>
  );
};

export default function Id_paciente({ pacienteId, Pagina, Page }: Props) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [Spyrometry, setSpyrometry] = useState<Spirometry[] | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      if (pacienteId) {
        //Si no hay pacienteId, no se hace nada

        try {
          const fetchedPatient: Patient = await getPatient(pacienteId); // Assuming getPatient returns a Patient
          setPatient(fetchedPatient);
          const fetchSpirometry = async () => {
            const fetchedSpirometry: Spirometry[] = await getSpirometriesList(
              pacienteId
            );
            setSpyrometry(fetchedSpirometry);
          };
          fetchSpirometry();
        } catch (error) {
          console.error("Error fetching patient:", error);
          setPatient(null); // Set patient to null if error
        } finally {
          setIsLoading(false); // Set loading state to false after fetching or error
        }
      }
      setIsLoading(false); // Set loading state to false after fetching or error
    };

    fetchData();
  }, [pacienteId]); // Run only when pacienteId changes
  return (
    <main className="w-full flex justify-center">
      {isLoading ? (
        <Instrucciones />
      ) : !pacienteId ? (
        <p>Elija un Paciente o cree uno.</p>
      ) : patient ? (
        <div className="flex flex-col w-11/12 justify-center items-center">
          {/* {pagina == "1" ? <AgregarEspiro Pagina={setPagina} /> : 
          <Ver_Mas Pagina={setPagina} />   
      } */}
          <div className="flex flex-row flex-direction-row-reverse justify-between gap-6 w-full">
            <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4">
              {patient.name}
            </p>
            <div className="flex flex-row items-center justify-center">
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
          <div className="w-11/12 flex flex-col justify-center items-center bg-primary_light py-4 rounded-sm">
            <div className="sm:w-11/12 flex flex-col w-full overflow-y-auto h-96 gap-6">
              {/* Patient information sections here, accessing patient.property */}
              <div className="bg-primary rounded-sm flex flex-col my-2 py-4 px-2">
                <div className="flex flex-row gap-2 px-2">
                  <p className="font-bold">Nombre y Apellido:</p>
                  <p className="font-medium">{patient.name}</p>
                </div>
                <div className="flex flex-row gap-2 px-2">
                  <p className="font-bold">Informacion Extra:</p>
                  <p className="font-medium">{patient.extrainfo}</p>
                </div>

                <div className="flex flex-row gap-2 px-2">
                  <p className="font-bold">Altura:</p>
                  <p className="font-medium">{patient.altura}</p>
                </div>

                <div className="flex flex-row gap-2 px-2">
                  <p className="font-bold">Peso:</p>
                  <p className="font-medium">{patient.peso}</p>
                </div>

                <div className="flex flex-row gap-2 px-2">
                  <p className="font-bold">Sexo:</p>
                  <p className="font-medium">{patient.sexo}</p>
                </div>

                <div className="flex flex-row gap-2 px-2">
                  <p className="font-bold">Altura:</p>
                  <p className="font-medium">{patient.altura}</p>
                </div>
                <div className="flex flex-row gap-2 px-2">
                  <p className="font-bold">Nacimiento:</p>
                  <p className="font-medium">{patient.nacimiento.toDateString()}</p>
                </div>
              </div>
              {Spyrometry?.map((spirometry) => (
                <div
                  className="bg-primary rounded-sm p-4 flex flex-row items-center"
                  key={spirometry.id}
                >
                  <div className="flex-grow">
                    <p>Fecha: {spirometry.date.toDateString()}</p>
                    <p>Fev1: {spirometry.fev1}</p>
                    <p>Fvc: {spirometry.fvc}</p>
                    <p>Obstrucción: {spirometry.obstructionia}</p>
                    <p>Restricción: {spirometry.restrictionai}</p>
                  </div>
                  <VerMasButton onClick={() => Page("3")} />
                </div>
              ))}
              <button onClick={() => Page("2")}>Agregar Espirometrías</button>
              <ByebyeButton tabla={"patient"} id={pacienteId} />
            </div>
          </div>
        </div>
      ) : (
        <p>Paciente no encontrado</p>
      )}
    </main>
  );
}
