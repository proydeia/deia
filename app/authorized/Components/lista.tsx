
import { useEffect, useState } from "react";
import { getPacientsList, getPatient } from "@/app/api/patient"; // Assuming these functions return promises or async dataimport { map, string } from "zod";
import { Patient } from "@/app/lib/db/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormButton from "@/app/componenetes/form_button";
import { Dispatch, SetStateAction } from "react";


export default function Lista_y_Busqueda({ onPacientSelect, Patient }: {
  onPacientSelect: Dispatch<SetStateAction<string>>,
  Patient: string
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [patientsList, setPatientsList] = useState<Patient[]>([]);

  type Id_pac = {
    Id: string
  }
  const NavigetoComp2 = (Id: string) => {
    // const targetRoute = '/id_paciente';
    // router.push(targetRoute);
    // Patient = onPacientSelect(Id)
    console.log("hola");
    // Patient = onPatientSelect
    onPacientSelect(Id);

    console.log(Patient);
  }
  useEffect(() => {
    (
      async () => {
        try {
          const patients = await getPacientsList();
          setPatientsList(patients);
        }
        catch (error: unknown) {
          console.log(error);
        }
      })();
  })

  //opcion 1: hacer un usestate y asignar ahi el id 
  // opcion 2: enviar todo a una pagina nueva tipo [slug] 

  return (
    <div className=" flex items-center  justify-center w-full p-4">
      <div className="w-11/12 flex flex-col gap-4 items-center">
        <p className="text-3xl font-bold text-left w-full">
          Historial de Pacientes
        </p>
        <div className="w-full">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded bg-primary_light static"
            />
          </div>
          <div className="h-96 overflow-y-auto ">
            {patientsList.map((patient) => (
              <div className="bg-primary_light rounded-sm gap-10 p-2 mb-2" key={patient.id}>
                <button onClick={() => NavigetoComp2(Patient = patient.id)}>
                  <p>{patient.name}</p>
                </button>
              </div>

            ))}
          </div>
          <div className="flex justify-center">
            <button className="bg-secondary rounded-md px-4 py-2 w-1/2">Agregar Paciente</button>

          </div>
        </div>
      </div>
    </div>
  );
}
