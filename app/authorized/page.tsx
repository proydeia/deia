import Navbar from "../navBar";
import AgregarPacientes from "../componenetes/agregar_p_form";
import Lista_y_Busqueda from "./Components/lista";
import Id_paciente from "./Components/id_paciente";

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
        <div className="bg-secondary  flex flex-col items-center justify-center sm:w-7/12  w-full  ">
        <p className="text-3xl font-bold text-left w-full p-6 mx-2">
          Demo de Pacientes
        </p>
          <Id_paciente />
          <button className="bg-primary_light text-third rounded-md px-4 py-2 w-1/2 my-4">
            Agregar Espirometria
          </button>
          {/* <AgregarPacientes /> */}
        </div>
      </main>
    </>
  );
}
