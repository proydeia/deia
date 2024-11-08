"use client";
import AgregarPacientes from "./Components/forms/patientForm";
import Lista_y_Busqueda from "./Components/structuralPages/lista";
import { useState } from "react";
import Paciente from "./Components/structuralPages/paciente";
import Image from "next/image";

export default function AuthorizedPage() {
  const [Pagina, setPagina] = useState(-1);

  const PaginaComponente = () => {
    switch (Pagina) {
      case -1:
        return (        
        <main>
          <div className="w-full h-screen flex flex-col justify-center items-center">
              <Image
            src="/Frame9.png"
            alt="Mi imagen"
            layout="fixed"
            width={400}
            height={400}
            className="relative top-5 z-5 animate-rotate-y animate-once animate-delay-[20000ms]  animate-ease-in-out animate-normal "
            />
               <p className="text-xl md:text-4xl font-titulo font-bold text-center text-primary_light w-full mb-4 mt-4">DEIA</p> 
          </div>
        </main>)
        
      case 0:
        return <AgregarPacientes Pagina={setPagina} />;

      default:
        return <Paciente pacienteId={Pagina} Pagina={setPagina} />;
    }
  };
  
  return (
    <>
      <main className="flex flex-col sm:flex-row h-screen">
        {/* LISTA DE PACIENTES */}
        <div className="sm:w-5/12 w-full flex items-center mt-10 justify-center bg-primary">
          <Lista_y_Busqueda
            Pagina={setPagina}
          />
        </div>
        {/* ACA VAMOS A IR CAMBIANDO DE COMPONENTES */}
        <div className="bg-secondary lg:mt-8 md:mt-4 mt-0 flex flex-col items-center justify-center sm:w-7/12  w-full  ">
          <PaginaComponente />
        </div>
      </main>
    </>
  );
}
