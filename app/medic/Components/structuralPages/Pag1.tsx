
import { Patient } from "@/app/lib/dbSchema/schema";

export default function Pag1({ paciente }: { paciente: Patient }) {
  console.log(paciente); // Log the patient data to the console

  return (
    <div className="w-11/12 flex flex-col justify-center items-center bg-primary_light py-4 rounded-sm">
      <div className="sm:w-11/12 flex flex-col w-full overflow-y-auto h-96 gap-6 ">
        <div className="bg-primary rounded-sm flex flex-col my-2 py-4 px-2">
          <div className="flex flex-row gap-2 px-2">
            <p className="font-bold">Nombre y Apellido:</p>
            <p className="font-medium">{paciente.name}</p>
          </div>
          <div className="flex flex-row gap-2 px-2">
            <p className="font-bold">Informacion Extra:</p>
            <p className="font-medium">{paciente.extrainfo}</p>
          </div>
          <div className="flex flex-row gap-2 px-2">
            <p className="font-bold">Sexo:</p>
            {paciente.sexo == 1 ? <p>Masculino</p> : <p>Femenino</p>}
          </div>
          {/* <div className="flex flex-row gap-2 px-2">
            <p className="font-bold">Peso:</p>
            <p className="font-medium">{paciente.peso}</p>
          </div> */}
          <div className="flex flex-row gap-2 px-2">
            <p className="font-bold">Altura:</p>
            <p className="font-medium">{paciente.altura}</p>
          </div>
          <div className="flex flex-row gap-2 px-2">
            <p className="font-bold">Fecha de nacimiento:</p>
            <p className="font-medium">{new Date(paciente.nacimiento).toDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}