"use client";
import { useState, useEffect } from "react";
import { getPatientsList, getPatient } from "@/app/actions/patient"; // Assuming these functions return promises or async data
import { userId } from "@/app/actions/token";

interface Paciente {
  id: string;
  name: string;
  extrainfo: string;
  medic: string;
}

export default function Lista_y_Busqueda(){
  // Specify the component type
  const [patients, setPatients] = useState<Paciente[] | Error>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPacientes, setFilteredPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     const id = await userId(); // Add semicolon here
//     const lista: Paciente[] | Error = await getPatientsList(id as string); // Type assertion for clarity
//     // setPatients(lista);
//     console.log(lista);
//     console.log("lista renderizada");
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//  const listaTest = filteredPacientes.map(
//     (paciente: Paciente, index: number) => (
//       <li key={index} className="bg-primary_light p-2 rounded mb-2 shadow-sm">
//         {paciente.name} {paciente.extrainfo}
//       </li>
//     )
//   );

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
            {loading ? <p>Loading patients...</p> : <ul></ul>}
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
