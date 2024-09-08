"use client";
import AgregarPacientes from "../componenetes/agregar_p_form";
import Lista_y_Busqueda from "./Components/lista";
import { useState } from "react";
import Paciente from "./Components/paciente";

export default function AuthorizedPage() {
  const [Pagina, setPagina] = useState("1");

  const PaginaComponente = () => {
    switch (Pagina) {
      case "1":
        return (        
        <main>
          <div className="w-full h-screen flex flex-col justify-center items-center">
              <p className="text-xl sm:text-2xl font-bold text-left text-primary_light w-full mb-4 mt-4">Como Usar nuestro sistema?</p>
              <div className="w-11/12 bg-primary_light h-1/2 rounded-sm p-4">
                  Demostración de Uso:
              </div>
          </div>
        </main>)
        
      case "2":
        return <AgregarPacientes Pagina={setPagina} />;

      default:
        return <Paciente pacienteId={Pagina} Pagina={setPagina} />;
    }
  };
  
  return (
    <>
      <main className="flex flex-col sm:flex-row h-screen">
        {/* LISTA DE PACIENTES */}
        <div className="sm:w-5/12 w-full flex items-center justify-center bg-primary">
          <Lista_y_Busqueda
            Pagina={setPagina}
          />
        </div>
        {/* ACA VAMOS A IR CAMBIANDO DE COMPONENTES */}
        <div className="bg-secondary  flex flex-col items-center justify-center sm:w-7/12  w-full  ">
          <PaginaComponente />
        </div>
      </main>
    </>
  );
}
