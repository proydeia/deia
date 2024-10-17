"use server";
import React from 'react';
import {getMedic, getMedicList, deleteUser} from '@/app/api/admin/admin';
import Form from './components/medicForm';

import UploadForm from './components/uploadFileForm';
import {submitedFile, aprovedFile} from '../api/admin/retriveFile';

export default async function adminPage() {
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
                                    <h3 className='m-1'> {medico.name}</h3>
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
                
                <h3>Crear Medicos</h3>
                <div className='bg-primary m-5 flex'>
                    <Form/>
                </div>
                <div className='bg-primary m-5 flex'>
                    { 
                        !!await aprovedFile() ? (
                            <>
                                <h3>Archivo subido</h3>
                            </>
                        ): 
                        
                        !!await submitedFile() ? (
                            <>
                                <h3>Archivo en espera de aprobacion</h3>
                            </>
                        )
                    
                        :(
                            <UploadForm/>
                        )
                    }
                </div>
            </div>
        </main>
    );
};