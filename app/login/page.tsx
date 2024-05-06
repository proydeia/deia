import Navbar from "../navBar";
import { useState } from 'react'
export default function LoginPage() {

//falta la funcion para tomar los datos ingresados, investigar useServer/useClient
    return (
        <>
            <Navbar />
            <main className="flex justify-center items-center h-full flex-col ">

                <h1 className="p-4 ">LoginPage</h1>
                <form className="flex flex-col items-center gap-4 w-1/2">
                    <label>Ingrese mail</label>
                    <input type="text" className="w-1/2 h-8 bg-red-100 border-none"></input>

                    <label>Ingrese contraseña</label>
                    <input type="text" className="w-1/2 h-8 bg-red-100 border-none"></input>
                    <submit type="submit" className="w-1/3 bg-yellow-600">Submit</submit>

                </form>

            </main>
        </>
    );
}