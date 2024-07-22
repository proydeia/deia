import { useState, useEffect } from "react";
import { Patient } from "@/app/lib/db/schema";
import { getPatient } from "@/app/api/patient";
import { getSpirometriesList } from "@/app/api/spirometry";
import { Spirometry } from "@/app/lib/db/schema";
import Instrucciones from "./instrucciones";
import ByebyeButton from "./byebyeButton";
import { Dispatch, SetStateAction } from "react";
import { set } from "zod";

interface Props {
  pacienteId: string; // ID passed as a prop
  Pagina: Dispatch<SetStateAction<string>>
}

export default function Id_paciente({ pacienteId, Pagina }: Props) {
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
        <>
          <div className="w-11/12 flex flex-col justify-center items-center bg-primary_light py-4 rounded-sm">
            <div className="sm:w-11/12 flex flex-col w-full overflow-y-auto h-96 gap-6">
              {/* Patient information sections here, accessing patient.property */}
              <p>{patient.name}</p>
              <p>{patient.extrainfo}</p>
              <p>{patient.id}</p>
              {Spyrometry?.map((spirometry) => (
                <div className="bg-primary_light rounded-sm shadow-lg shadow-primary p-4" key={spirometry.id}>
                  <p>Fecha: {spirometry.date.toDateString()}</p>
                  <p>Fev1: {spirometry.fev1}</p>
                  <p>Fvc: {spirometry.fvc}</p>
                </div>
              ))}
              <button onClick={() => 
              Pagina("4")
              }
              >Volver</button>
              <ByebyeButton tabla={"patient"} id={pacienteId} />
            </div>
          </div>
        </>
      ) : (
        <p>Paciente no encontrado</p>
      )}
    </main>
  );
}
