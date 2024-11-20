import React from "react";
import { getMedic, getMedicList, deleteUser } from "@/app/api/admin/admin";


export default async function ListaMedic() {
  let medicos = await getMedicList();

  let searchTerm = '';

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    "use client";
    searchTerm = event.target.value.toLowerCase();
    medicos = medicos.filter((medico) => medico.email.toLowerCase().includes(searchTerm));
  };

  return (
    <div className="flex flex-row-reverse relative w-full">
      <div className="pt-24 w-full">
         <div className="flex flex-col gap-1 items-start mx-10 justify-between">
            <h3 className="text-2xl  font-bold  font-subtitulo text-left  mt-4 mb-2">
              Lista Médicos
            </h3>
            <input
              type="search"
              name="search"
              id="search"
              // value={searchTerm}
              // onChange={handleSearchChange}
              placeholder="Nombre del Médico"
              className="self-auto block h-10 mr-12 rounded-md border-0 py-2 pl-2 pr-10 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          
        <div className="w-10/12 mx-4 mb-6 mt-3  overflow-y-auto">
          {medicos.map((medico) => (
            <div
              className="mt-4 mb-4 flex flex-col py-2 px-4 gap-4 shadow-md rounded-xl bg-primary_light"
              key={medico.email}
            >
              <div className="flex flex-row  justify-between items-center rounded-xl">
                <form
                  action={async () => {
                    "use server";
                    console.log(await getMedic(medico.email));
                  }}
                >
                  <button type="submit" className=" rounded-md m-1">
                    <h3 className="m-1">{medico.email}</h3>
                  </button>
                </form>
                <form
                  action={async () => {
                    "use server";
                    await deleteUser(medico.email);
                  }}
                >
                  <button type="submit" className="bg-red p-1 rounded-md m-1">
                    <h3 className="m-1"> Eliminar Medico</h3>
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}