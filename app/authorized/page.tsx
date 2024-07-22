'use client'
import Navbar from "../navBar";
import AgregarPacientes from "../componenetes/agregar_p_form";
import Lista_y_Busqueda from "./Components/lista";
import Id_paciente from "./Components/id_paciente";
import { useState } from "react";
import AgregarEspiro from "../componenetes/agregar_s_form";
import Default from "./Components/default";

export default function AuthorizedPage() {

  const [state, setState] = useState("")
  const [Pagina, setPagina] = useState("0")
  const PaginaComponente = () => {
    switch (Pagina) {
      case "1":
        return <AgregarPacientes Pagina={setPagina} />;
      case "2":
        return <AgregarEspiro />;
      case "3":
        return <Id_paciente pacienteId={state} Pagina={setPagina}/>;
     
      case "4":
        return <Default/>;
    }
  };
  console.log("State:", state)
  return (
    <>
      <Navbar />
      <main className="flex flex-col sm:flex-row h-screen">
        {/* LISTA DE PACIENTES */}
        <div className="sm:w-5/12 w-full flex items-center justify-center bg-primary">
          <Lista_y_Busqueda onPacientSelect={setState} Patient={state} Pagina={setPagina}/>
        </div>

        {/* ACA VAMOS A IR CAMBIANDO DE COMPONENTES */}
        <div className="bg-secondary  flex flex-col items-center justify-center sm:w-7/12  w-full  ">
          {/* <Id_paciente pacienteId={state}/> */}
          {/* <AgregarPacientes /> */}
          {/* <AgregarEspiro/> */}
          <PaginaComponente/>
        </div>
      </main>
    </>
  );
}
