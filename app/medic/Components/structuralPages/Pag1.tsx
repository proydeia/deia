import { Patient } from "@prisma/client";
import { getPatient } from "@/app/api/medic/patient/patient";
import { useState, useEffect } from "react";
export default function Pag1({ paciente }: { paciente: number }) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (paciente) {
        try {
          const fetchedPatient: any = await getPatient(paciente);
          setPatient(fetchedPatient);
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
  }, [paciente]);

  console.log(paciente); // Log the patient data to the console

  return (
    <div className="w-11/12 flex flex-col justify-center items-center bg-primary_light py-4 rounded-sm">
      <div className="sm:w-11/12 flex flex-col w-full overflow-y-auto h-96 gap-6 ">
        <div className="bg-primary rounded-sm flex flex-col my-2 gap-3 py-4 px-2">
          <div className="flex flex-row gap-2 px-2 justify-between">
            <p className="font-bold">Nombre y Apellido:</p>
            <p className="font-medium justify-self-end">{patient?.name}</p>
          </div>
          <div className="flex flex-row gap-2 px-2 justify-between">
            <p className="font-bold">Sexo:</p>
            {patient?.sexo == 1 ? (
              <p className="font-medium justify-self-end">Masculino</p>
            ) : (
              <p className="font-medium justify-self-end">Femenino</p>
            )}
          </div>
          {/* <div className="flex flex-row gap-2 px-2">
            <p className="font-bold">Peso:</p>
            <p className="font-medium">{patient.peso}</p>
            </div> */}
          <div className="flex flex-row gap-2 px-2 justify-between">
            <p className="font-bold">Altura:</p>
            <p className="font-medium justify-self-end">{patient?.altura}</p>
          </div>
          <div className="flex flex-row gap-2 px-2 justify-between">
            <p className="font-bold">Fecha de nacimiento:</p>
            <p className="font-medium justify-self-end">
              {patient?.nacimiento
                ? new Date(patient?.nacimiento).toDateString()
                : NaN}
            </p>
          </div>
        </div>
        <div className="bg-primary rounded-sm flex flex-col my-2 gap-3 py-4 px-2">
          <div className="flex flex-row gap-2 px-2 justify-between">
            <p className="font-bold">Informacion Extra:</p>
            <p className="font-medium justify-self-end">{patient?.extrainfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
