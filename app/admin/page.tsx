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
    <main className="flex-grow min-h-screen">
      <div className="bg-fondo_light h-screen flex flex-col md:flex-row w-screen grow justify-between">
        <div className="w-full md:w-5/12 items-start md:h-full h-screen ">
          <ListaMedic />
        </div>
        <div className="w-full md:w-7/12 items-end rounded-l-3xl bg-primary mt-16 shadow-2xl md:h-screen h-full grow">
          <div className="mt-8 h-screen">
            <h3 className="text-2xl font-bold px-6 py-3 font-subtitulo text-left w-full mt-4 mb-2 bg-primary_light">
              Crear Medicos
            </h3>
            <div className="w-1/2 m-5 flex">
              <Form />
            </div>
          <div className="bg-primary m-5 flex flex-col items-baseline justify-center gap-4">
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
        </div>
      </div>
    </main>
  );
}