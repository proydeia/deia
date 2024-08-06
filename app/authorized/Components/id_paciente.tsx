import { useState, useEffect } from "react";
import { Patient } from "@/app/lib/db/schema";
import { getPatient } from "@/app/api/patient";
import { getSpirometriesList } from "@/app/api/spirometry";
import { Spirometry } from "@/app/lib/db/schema";
import Instrucciones from "./instrucciones";
import ByebyeButton from "./byebyeButton";
import { Dispatch, SetStateAction } from "react";
import Volver_btn from "./volver_btn";
import AgregarEspiro from "@/app/componenetes/agregar_s_form";
import Ver_Mas from "./mas_esp";
interface Props {
  pacienteId: string; // ID passed as a prop
  Pagina: Dispatch<SetStateAction<string>>;
}

export default function Id_paciente({ pacienteId, Pagina }: Props) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [Spyrometry, setSpyrometry] = useState<Spirometry[] | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [pagina, setPagina] = useState("");

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
        {/* {pagina == "1" ? <AgregarEspiro Pagina={setPagina} /> : <Ver_Mas Pagina={setPagina} />} */}
          <div className="w-11/12 flex flex-col justify-center items-center bg-primary_light py-4 rounded-sm">
            <div className="sm:w-11/12 flex flex-col w-full overflow-y-auto h-96 gap-6">
              {/* Patient information sections here, accessing patient.property */}
              <div className="bg-primary rounded-sm flex flex-col my-2 py-4 px-2">
                <div className="flex flex-row gap-2">
                  <p className="font-bold">Nombre y Apellido:</p>
                  <p className="font-medium">{patient.name}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <p className="font-bold">Informacion Extra:</p>
                  <p className="font-medium">{patient.extrainfo}</p>
                </div>

                <div className="flex flex-row gap-2">
                  <p className="font-bold">Informacion Extra:</p>
                  <p className="font-medium">{patient.extrainfo}</p>
                </div>

              </div>
              {Spyrometry?.map((spirometry) => (
                <div
                  className="bg-primary_light rounded-sm shadow-lg shadow-primary p-4"
                  key={spirometry.id}
                >
                  <p>Fecha: {spirometry.date.toDateString()}</p>
                  <p>Fev1: {spirometry.fev1}</p>
                  <p>Fvc: {spirometry.fvc}</p>
                </div>
              ))}
              <button onClick={() => setPagina("2")}>Ver Mas</button>
              <Volver_btn Pagina={() => Pagina("default")} />
              <button onClick={() => setPagina("2")}>Agregar Espirometrías</button>
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
