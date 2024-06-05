"use client"

import { getPatientsList } from "@/app/actions/patient";
import { userId } from "@/app/actions/token";
import { useState, useEffect } from "react";
import AgregarPacientes from "@/app/componenetes/agregar_p_form";
import Lista_y_Busqueda from "../Components/lista";
import Navbar from "@/app/navBar";

export default function IngresoPaciente() {
  const [formA, setFormA] = useState(0);


  

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
