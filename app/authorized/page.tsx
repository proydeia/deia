"use client";
import Navbar from "../navBar";
import AgregarPacientes from "../componenetes/agregar_p_form";
import Lista_y_Busqueda from "./Components/lista";
import Id_paciente from "./Components/id_paciente";
import { useState } from "react";
import AgregarEspiro from "../componenetes/agregar_s_form";
import Default from "./Components/default";
import Ver_Mas from "./Components/mas_esp";
import Paciente from "./Components/paciente";

export default function AuthorizedPage() {
  const [Pagina, setPagina] = useState("1");

  console.log("Estado:" + Pagina)
  const PaginaComponente = () => {
    switch (Pagina) {
      case "1":
        return <Default />
        
      case "2":
        return <AgregarPacientes Pagina={setPagina} />;

      default:
        return <Paciente pacienteId={Pagina} Pagina={setPagina} />;
    }
  };
  
  return (
    <>
      <Navbar />
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
