
import { useEffect, useState } from "react";
import { getPatientsList, getPatient } from "@/app/api/patient"; // Assuming these functions return promises or async dataimport { map, string } from "zod";
import { Patient } from "@/app/lib/db/schema";
import FormButton from "@/app/componenetes/form_button";
import { Dispatch, SetStateAction } from "react";
import AgregarPacientes from "@/app/componenetes/agregar_p_form";


export default function Lista_y_Busqueda({ onPacientSelect, Patient, Pagina }: {
  onPacientSelect: Dispatch<SetStateAction<string>>,
  Pagina: Dispatch<SetStateAction<string>>,
  Patient: string
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const [showAgregarP, setShowAgregarP] = useState(false)

  type Id_pac = {
    Id: string
  }
  const NavigetoComp2 = (Id: string) => {
    console.log("Clicked on:", Id)
    onPacientSelect(Id);
    console.log(Pagina);
    Pagina("3")
   }
  
   useEffect(() => {
    const fetchData = async () => {
      try {
        const patients: Patient[] = await getPatientsList(); // Assuming getPacientsList returns Patient[]
        setPatientsList(patients);
      } catch (error: unknown) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  const handleAgregarP = () => {
    setShowAgregarP(true)
    Pagina("1")
  };
  //opcion 1: hacer un usestate y asignar ahi el id 
  // opcion 2: enviar todo a una pagina nueva tipo [slug] 

  return (
    <div className=" flex items-center  justify-center w-full p-4">
      <div className="w-11/12 flex flex-col gap-4 items-center">
        <p className="text-3xl font-bold text-left w-full mt-4 mb-2">
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
                <button className="w-full flex justify-start items-start" onClick={() => NavigetoComp2(patient.id)}>
                  <p>{patient.name}</p>
                </button>
              </div>

            ))}
          </div>
          <div className="flex justify-center">
            <button onClick={handleAgregarP} className="bg-secondary rounded-md px-4 py-2 my-4 w-1/2">Agregar Paciente</button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
