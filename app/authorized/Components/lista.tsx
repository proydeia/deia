
"use client";
import { useEffect, useState } from "react";
import { getPacientsList } from "@/app/api/patient"; // Assuming these functions return promises or async dataimport { map, string } from "zod";
import { Patient } from "@/app/lib/db/schema";
import Link from "next/link";
import {  useRouter } from "next/navigation";


export default function Lista_y_Busqueda() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patientsList, setPatientsList] = useState<Patient[]>([]);

  const router = useRouter();

  const NavigetoComp2 = () =>{
    const targetRoute = '/id_paciente';
    router.push(targetRoute);
  }
  useEffect(() => {
    (async () => {
      try {
        const patients = await getPacientsList();
        setPatientsList(patients);
      }
      catch (error: unknown) {
        console.log(error);
      }
    })();
  })



  return (
    <div className=" flex items-center  justify-center bg-primary">
      <div className="w-10/12 flex flex-col gap-4 items-center">
        <p className="text-3xl font-bold text-left w-full">
          Historial de Pacientes
        </p>
        <div className="w-full ">
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
              <div key={patient.id}>
                <Link href={patient.id} onClick={NavigetoComp2} >
                <p className="bg-secondary rounded-lg gap-6 ">{patient.name}</p>
                </Link>
              </div>
            ))} 
          </div>
        </div>
      </div>
    </div>
  );
}
