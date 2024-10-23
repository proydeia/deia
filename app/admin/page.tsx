"use server";
import React from 'react';
import { getMedic, getMedicList, deleteUser } from '@/app/api/admin/admin';
import Form from './components/medicForm';
import UploadForm from './components/uploadFileForm';
import {retrive} from '#/admin/PDF/retrive/retriveFile';
import { deleteFile } from '#/admin/PDF/delete/route';

export default async function adminPage() {
    const { file, aproved } = await retrive();
    const medicos = await getMedicList();
    return (
        <main>
            <div>
                <h1 className='text-center font-black m-3'>Admin page</h1>                
                <h3>Lista Medicos</h3>
                <div className='bg-third m-5'>
                    {medicos.map((medico) => (
                        <div key={medico.id}>
                            <form action={async() => {"use server"; console.log(await getMedic(medico.id))}} >
                                <button type='submit' className='bg-primary rounded-md m-1'>
                                    <h3 className='m-1'>{medico.name}</h3>
                                </button>
                            </form>
                            <form action={async() => {"use server"; await deleteUser(medico.id)}} >
                                <button type='submit' className='bg-red rounded-md m-1'>
                                    <h3 className='m-1'> Eliminar Medico</h3>
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
                <div>
                    <h3>Crear Medicos</h3>
                    <div className='bg-primary m-5 flex'>
                        <Form/>
                    </div>
                </div>
                <div className='bg-primary m-5 flex'>
                    { 
                        !file && !aproved ?(
                            <>
                                <UploadForm/>
                            </>
                        ): !!file && !aproved ? (
                            <>
                                <h3>Archivo en espera de aprobacion</h3>
                                <a href={file.downloadUrl}>Descargar</a>
                                <form action={async() => {"use server"; await deleteFile()}} >
                                    <button type='submit' className='bg-red rounded-md m-1'>
                                        <h3 className='m-1'>Eliminar Archivo</h3>
                                    </button>
                                </form>
                            </>
                        ):(
                            <>
                                <h3>Archivo aprobado</h3>
                                <a href={file.downloadUrl}>Descargar</a>
                                <form action={async() => {"use server"; await deleteFile()}} >
                                    <button type='submit' className='bg-red rounded-md m-1'>
                                        <h3 className='m-1'>Eliminar Archivo</h3>
                                    </button>
                                </form>
                            </>
                        )
                    }
                </div>
            </div>
        </main>
    );
};