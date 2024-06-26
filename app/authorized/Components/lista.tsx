
"use client";
import { useState } from "react";
import { getPatientsList } from "@/app/actions/patient"; // Assuming these functions return promises or async data


const a = async() => await getPatientsList();
export default function Lista_y_Busqueda() {
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
              <p>{patient.name}{patient.id}</p>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
