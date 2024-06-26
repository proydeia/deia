import Navbar from "../navBar";
import AgregarPacientes from "../componenetes/agregar_p_form";
import Lista_y_Busqueda from "./Components/lista";

export default async function AuthorizedPage() {

  return (
    <>
      <Navbar />
      <main className="flex flex-col sm:flex-row h-screen">
        {/* LISTA DE PACIENTES */}
        <div className="sm:w-5/12 w-full flex items-center justify-center bg-primary">
                 <Lista_y_Busqueda/> 
          <div className="w-10/12 flex flex-col gap-4 items-center">
            {/* lista pacientes */}
              <div className="h-96 overflow-y-auto">
                 {/* {a.map((patient) => (
                  
                   <p className="bg-primary_light p-2 rounded mb-2 shadow-sm">{patient.name}</p>
                 
                ))}  */}

                {/* espirometrias
                {b.map((spirometry) => (
                  <p key={spirometry.id}>Obstruccion: {spirometry.obstruction}   Restriction: {spirometry.restriction}</p>
                ))} */}
              </div>

              <div className="w-full flex justify-center">
                <button className="mt-4 mx-6 bg-third text-white py-2 px-8 rounded">
                  Agregar Paciente
                </button>
              </div>
            </div>
          </div>
        
        {/* ACA VAMOS A IR CAMBIANDO DE COMPONENTES */}
        <div className="bg-secondary w-full sm:w-7/12 ">
          <AgregarPacientes />
        </div>
      </main>
    </>
  );
}




