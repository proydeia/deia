import Navbar from "../navBar";
import AgregarPacientes from "../componenetes/agregar_p_form";
import Lista_y_Busqueda from "./Components/lista";
// import Id_paciente from "./Components/id_paciente";

export default async function AuthorizedPage() {

  return (
    <>
      <Navbar />
      <main className="flex flex-col sm:flex-row h-screen">
        {/* LISTA DE PACIENTES */}
        <div className="sm:w-5/12 w-full flex items-center justify-center bg-primary">
          <Lista_y_Busqueda />
        </div>
          

        {/* ACA VAMOS A IR CAMBIANDO DE COMPONENTES */}
        <div className="bg-secondary w-full sm:w-7/12 ">
          {/* <AgregarPacientes /> */}
          {/* <Id_paciente patient={} /> */}
        </div>
      </main>
    </>
  );
}




