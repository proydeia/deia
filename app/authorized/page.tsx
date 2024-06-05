import { spirometriesModel, getSpirometry } from "../actions/spirometry";
import { getPatientsList } from "../actions/patient";
import Navbar from "../navBar";
import Lista_y_Busqueda from "./Components/lista";
import { useEffect, useState } from "react";
import { userId } from "../actions/token";


interface Paciente {
    id: string;
    name: string;
    extrainfo: string;
    medic: string;
  }

export default async function AuthorizedPage() { 
    
    // "use client"
    // const [paciente, setPaciente] = useState<Paciente[]>([]);
    // const [loading, setLoading] = useState(true)
    // const id = await userId()
    // useEffect(() => {

    //     const obtener_lista = async () => {
    //         const lista = await getPatientsList(id as string);
    //         setPaciente(lista);
    //         setLoading(false);
    //     }
    //     obtener_lista();
    // }, [])
    
    // console.log("ola")
    // console.log(paciente)
    return (
        <>
           <Navbar/>
      <main className="flex flex-row h-screen">
        {/* LISTA DE PACIENTES */}
        <Lista_y_Busqueda/>
        {/* PREVISUALIZACION DE PACIENTES */}
        <div className="w-7/12 bg-secondary flex justify-center ">
          {/* {formA === 1 && <AgregarPacientes />} */}
          <div className="h-full w-10/12 flex items-center justify-center flex-col ">
            <p className="font-bold text-left text-3xl w-full">
              Instrucciones
            </p>
            <div className="text-left ">Como usar nuestra página?</div>
          </div>
        </div>
      </main>
        </>
    );
}



    
