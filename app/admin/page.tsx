"use server";
import {getMedic, getMedicList, deleteUser} from '../api/admin'; //create user ya esta implementado en el Form adentro de la misma carpeta admin
import Form from './form';
export default async function adminPage() {
    const medicos = await getMedicList();
    return (
        <main>
            <div>
                <h1 className='text-center font-black m-3'>Admin page</h1>
                {/* <h2>Organizacion: {JSON.stringify(o)} </h2>   Por motivos que para nada incumben al back y la estructura de la db, POR AHORA, no vamos a mostrar la organizacion      */} 
                
                <h3>Lista Medicos (La lista es de botones. Saca un console.log(), por server, de la info individual de cada registro. Si te fijas en el script ves la funcion en cada iteracion. Es para probar pedir info individual de  cada medico):</h3>
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
            </div>
        </main>
    );
};