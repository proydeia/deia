// "use client";
import { useState } from "react";
import { getPatientsList, getPatient } from "@/app/actions/patient"; // Assuming these functions return promises or async data
import { userId } from "@/app/actions/token";


export default async function Lista_y_Busqueda(){
  const a = await getPatientsList();
  // Specify the component type
  // const [patients, setPatients] = useState<Paciente[] | Error>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [filteredPacientes, setFilteredPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);



  return (
    <div className="w-5/12 flex items-center justify-center bg-primary">
      <div className="w-10/12 flex flex-col gap-4 items-center">
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
          <div className="h-96 overflow-y-auto">
            {/* {loading ? <p>Loading patients...</p> : a.map((patient) => (
                   <button
                   key={patient.id}
                   onClick={() => console.log("Clicked Patient:", patient)}
                 >
                   <p className="bg-primary_light p-2 rounded mb-2 shadow-sm">{patient.name}</p>
                 </button>
                ))} */}
          </div>
        </div>

        <div className="w-full flex justify-center ">
          <button
            onClick={() => {
              // Implement logic for adding patients here
              console.log("Adding patients...");
            }}
            className="mt-4 mx-6 bg-third text-white py-2 px-8 rounded"
          >
            Agregar pacientes
          </button>
        </div>
      </div>
    </div>
  );
}
