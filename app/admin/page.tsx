"use server";
import React from 'react';
import { getMedic, getMedicList, deleteUser } from '@/app/api/admin/admin';
import Form from './components/medicForm';
import UploadForm from './components/uploadFileForm';
import { retrive } from '#/admin/PDF/retrive/retriveFile';
import { deleteFile } from '#/admin/PDF/delete/deleteFile';

export default async function adminPage() {
    const { file, aproved } = await retrive();
    const medicos = await getMedicList();
    return (
        <main className='pt-20 bg-fondo_light h-screen'>
            {/* <h1 className='text-center font-black m-3'>Admin page</h1>   */}
            <div className='flex flex-row'>
                <div className='w-1/2'>
                    <h3 className='text-2xl font-bold px-4 font-subtitulo text-left w-full mt-4 mb-2'>Lista Medicos</h3>
                    <div className='w-10/12 mx-4 my-6   overflow-y-auto'>
                        {medicos.map((medico) => (
                            <div className='mt-4 mb-4 flex flex-col gap-4 shadow-md rounded-xl bg-primary_light'>
                                <div className='flex flex-row  justify-around items-center rounded-xl' key={medico.id}>
                                    <form action={async () => { "use server"; console.log(await getMedic(medico.id)) }} >
                                        <button type='submit' className=' rounded-md m-1'>
                                            <h3 className='m-1'>{medico.name}</h3>
                                        </button>
                                    </form>
                                    <form action={async () => { "use server"; await deleteUser(medico.id) }} >
                                        <button type='submit' className='bg-red p-1 rounded-md m-1'>
                                            <h3 className='m-1'> Eliminar Medico</h3>
                                        </button>
                                    </form>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
                <div className='w-1/2'>
                    <div>
                        <h3>Crear Medicos</h3>
                        <div className='bg-primary m-5 flex'>
                            <Form />
                        </div>
                    </div>
                    <div className='bg-primary m-5 flex'>
                        {
                            !file && !aproved ? (
                                <>
                                    <UploadForm />
                                </>
                            ) : !!file && !aproved ? (
                                <>
                                    <h3>Archivo en espera de aprobacion</h3>
                                    <a href={file.downloadUrl}>Descargar</a>
                                    <form action={async () => { "use server"; await deleteFile() }} >
                                        <button type='submit' className='bg-red rounded-md m-1'>
                                            <h3 className='m-1'>Eliminar Archivo</h3>
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <h3>Archivo aprobado</h3>
                                    <a href={file.downloadUrl}>Descargar</a>
                                    <form action={async () => { "use server"; await deleteFile() }} >
                                        <button type='submit' className='bg-red rounded-md m-1'>
                                            <h3 className='m-1'>Eliminar Archivo</h3>
                                        </button>
                                    </form>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};