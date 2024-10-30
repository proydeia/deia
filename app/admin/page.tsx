"use server";
import React from "react";
import Form from "./components/medicForm";
import UploadForm from "./components/uploadFileForm";
import { retrive } from "#/admin/PDF/retrive/retriveFile";
import { deleteFile } from "#/admin/PDF/delete/deleteFile";
import ListaMedic from "./components/listaMedic";


export default async function adminPage() {
  const { file, aproved } = await retrive();

  return (
    <main className=" bg-fondo_light h-screen">
        
      {/* <h1 className='text-center font-black m-3'>Admin page</h1>   */}
       <ListaMedic/>
        <div className="w-1/2 bg-primary h-screen mt-12  shadow-2xl relative">
          <div className="mt-12 ">
            <h3 className="text-2xl font-bold px-6 py-3 font-subtitulo text-left w-full mt-4 mb-2 bg-primary_light ">
              Crear Medicos
            </h3>
            <div className="w-1/2 m-5 flex">
              <Form />
            </div>
          </div>
          <div className=" bg-primary m-5 flex flex-col items-baseline justify-center gap-4">
            {!file && !aproved ? (
              <>
                <UploadForm />
              </>
            ) : !!file && !aproved ? (
              <>
                <h3>Archivo en espera de aprobacion</h3>
                <a href={file.downloadUrl}>Descargar</a>
                <form
                  action={async () => {
                    "use server";
                    await deleteFile();
                  }}
                >
                  <button type="submit" className="bg-red rounded-md m-1">
                    <h3 className="m-1">Eliminar Archivo</h3>
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3>Archivo aprobado</h3>
                <a href={file.downloadUrl}>Descargar</a>
                <form
                  action={async () => {
                    "use server";
                    await deleteFile();
                  }}
                >
                  <button type="submit" className="bg-red rounded-md m-1">
                    <h3 className="m-1">Eliminar Archivo</h3>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
    </main>
  );
}
