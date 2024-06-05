import { getSpirometriesList } from "@/app/actions/spirometry";
import { getPatientsList } from "@/app/actions/patient";
import Navbar from "../navBar";
// import NavbarA from "./Components/NavBar";

export default async function AuthorizedPage() {

  // const a = await getPatientsList();
  // const b = await getSpirometriesList("mc82fy9hrcn489pnyrcf489n8pq23");
  return (
    <>
      <Navbar />
      <main className="flex flex-row h-screen">
        {/* LISTA DE PACIENTES */}
        <div className="w-5/12 flex items-center justify-center bg-primary">
          <div className="w-10/12 flex flex-col gap-4 items-center">
            <p className="text-3xl font-bold text-left w-full">Historial de Pacientes</p>
            <div className="w-full">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Buscar Paciente"
                  className="w-full p-2 border rounded bg-primary_light static"
                />
              </div>
              {/* lista pacientes */}
              <div className="h-96 overflow-y-auto">
                {/* <h1>

                {a.map((patient) => (
                  <p key={patient.id}>{patient.name}</p>
                ))}
                </h1> */}
              </div>

              <div className="w-full flex justify-center">
                <button className="mt-4 mx-6 bg-third text-white py-2 px-8 rounded">
                  Agregar Paciente
                </button>
              </div>
            </div>
          </div>
        </div>
        <h1>
          {/* pacientes
                            {a.map((patient) => (
                                <p key={patient.id}>{patient.name}</p>
                            ))}

                            espirometrias
                            {b.map((spirometry) => (
                                <p key={spirometry.id}>Obstruccion: {spirometry.obstruction}   Restriction: {spirometry.restriction}</p>
                            ))} */}
        </h1>
      </main>
    </>
  );
}




