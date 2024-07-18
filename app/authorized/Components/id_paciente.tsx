import { useState, useEffect } from "react";
import { Patient } from "@/app/lib/db/schema";
import { getPatient } from "@/app/api/patient";
import { getSpirometriesList } from "@/app/api/spirometry";
import { Spirometry } from "@/app/lib/db/schema";
import Instrucciones from "./instrucciones";
import ByebyeButton from "./byebyeButton";

interface Props {
  pacienteId: string; // ID passed as a prop
}

export default function Id_paciente({ pacienteId }: Props) {
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
        } finally {
          setIsLoading(false); // Set loading state to false after fetching or error
        }
      }
    };

    fetchData();
  }, [pacienteId]); // Run only when pacienteId changes
  return (
    <main className="w-full flex justify-center">
      {isLoading ? (
        <Instrucciones />
      ) : patient ? (
        <div>
          <div className="w-11/12 flex flex-col justify-center items-center bg-primary_light py-4 rounded-sm">
            <div className="sm:w-11/12 flex flex-col w-full overflow-y-auto h-96 gap-6">
              {/* Patient information sections here, accessing patient.property */}
              <p>{patient.name}</p>
              <p>{patient.extrainfo}</p>
              <p>{patient.id}</p>
              {Spyrometry?.map((spirometry) => (
                <div key={spirometry.id}>
                  <p>{spirometry.date.toDateString()}</p>
                  <p>{spirometry.fev1}</p>
                  <p>{spirometry.fvc}</p>
                </div>
              ))}
              <button onClick={() => setPatient(null)}>
                Volver a pagina principal
              </button>
              <ByebyeButton tabla={"patient"} id={pacienteId} />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-2xl sm:text-3xl font-bold text-center text-primary_light w-full mb-4 mt-4">
          Seleccione a un paciente idiota :)
        </p>
      )}
    </main>
  );
}
