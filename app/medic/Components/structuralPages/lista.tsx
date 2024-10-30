
import { useEffect, useState } from "react";
import { getPatientsList } from "@/app/api/medic/patient"; // Assuming these functions return promises or async dataimport { map, string } from "zod";
import { Patient } from "@/app/lib/dbSchema/schema";
import { Dispatch, SetStateAction } from "react";

export default function Lista_y_Busqueda({ Pagina }: {
  Pagina: Dispatch<SetStateAction<string>>,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  const NavigetoComp2 = (Id: string) => {
    // console.log("Clicked on:", Id)
    // console.log(Pagina);
    Pagina(Id)
   }
  
   useEffect(() => {
    const fetchData = async () => {
      try {
        const patients = await getPatientsList(); // Assuming this returns only { id: string, name: string }[]
    
        // Map the data to include default values for missing fields
        const fullPatientsList: Patient[] = patients.map((patient: { id: string; name: string }): Patient => ({
          id: patient.id,
          name: patient.name,
          extrainfo: "", // Default value for missing fields
          medic: "Unknown",
          peso: 0,
          altura: 0,
          nacimiento: new Date(),
          sexo: 0,
        }));
    
        setPatientsList(fullPatientsList);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const filteredList = patientsList.filter((patient: Patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filteredList);
  }, [patientsList, searchTerm]);

  const handleAgregarP = () => {
    Pagina("2")
  };
  //opcion 1: hacer un usestate y asignar ahi el id 
  // opcion 2: enviar todo a una pagina nueva tipo [slug] 

  return (
    <div className=" flex items-center mt-20 justify-center w-full py-4 px-2">
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
          <div className="h-80 overflow-y-auto ">
            {filteredPatients.length > 0 ? (filteredPatients.map((patient) => (
              <div className="bg-primary_light rounded-md shadow-md gap-10 p-2 mb-2" key={patient.id}>
                <button className="w-full flex justify-start items-start" onClick={() => NavigetoComp2(patient.id)}>
                  <p>{patient.name}</p>
                </button>
              </div>
            )))
           : (
            <p className="text-center text-gray-500">No se encontraron pacientes</p>
          )}
          </div>
          <div className="flex justify-center mb-6">
            <button onClick={handleAgregarP} className="bg-secondary rounded-md px-4 py-2 mt-4  w-1/2">Agregar Paciente</button>   
          </div>
        </div>
      </div>
    </div>
  );
}
