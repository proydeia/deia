
import { useState, useEffect } from "react";
import { Patient } from "@/app/lib/db/schema";
import { getPatient } from "@/app/api/patient";
import { getSpirometriesList } from "@/app/api/spirometry";
import { Spirometry } from "@/app/lib/db/schema";
import Instrucciones from "./instrucciones";

interface Props {
  pacienteId: string; // ID passed as a prop
}


export default function Id_paciente({ pacienteId }: Props) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [Spyrometry, setSpyrometry] = useState<Spirometry | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const fetchedPatient: Patient = await getPatient(pacienteId); // Assuming getPatient returns a Patient
        setPatient(fetchedPatient);
        const fetchSpirometry = async () => {
          const fetchedSpirometry: Spirometry[] = await getSpirometriesList(pacienteId);
          setSpyrometry(fetchedSpirometry);
        };
        fetchSpirometry()
      } catch (error) {
        console.error("Error fetching patient:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching or error
      }
    };

    fetchData();
  }, [pacienteId]); // Run only when pacienteId changes

  // const handle = () => {
  //   console.log("Patient ID:", pacienteId); // Access the ID directly from props
  //   console.log("Patient:", patient); // Access fetched patient data (if available)
  // };

  return (
    <main className="w-full flex justify-center">
      
      {isLoading ? (
        <Instrucciones/ >
      ) : patient ? (
        <>
        <div className="w-11/12 flex flex-col justify-center items-center bg-primary_light py-4 rounded-sm">

          <div className="sm:w-11/12 flex flex-col w-full overflow-y-auto h-96 gap-6">
            {/* Patient information sections here, accessing patient.property */}
            <p>{patient.name}</p>
            <p>{patient.extrainfo}</p>
            <p>{patient.id}</p>
            <p>{Spyrometry?.id}</p>
          </div>
          
        </div>
        </>
      ) : (
        <p>No encontramos pacientes con este ID</p>
      )}
    </main>
  );
}
