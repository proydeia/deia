'use client'
import Navbar from "../navBar";
import React, { useRef } from 'react'
export default function LoginPage() {

    
// //falta la funcion para tomar los datos ingresados, investigar useServer/useClient
// function handleSubmit(e){
//     //previene que el navegador recargue la pagina
//     e.preventDefault();

//     //lee los datos del formulario
//     const form = e.target;
//     const formData = new FormData(form);

//     //aca convierto los datos en un JSON
//     const formJson = Object.fromEntries(formData.entries());
//     console.log(formJson);
// }

    return (
        <>
            <Navbar />
            <main className="flex justify-center items-center h-full flex-col ">

                <h1 className="p-4 ">LoginPage</h1>
                <form 
                method="post" 
                className="flex flex-col items-center gap-4 w-1/2"
                
                onSubmit={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    const target = e.target as typeof e.target & {
                        email: {value: string };
                        password: {value: string};
                    };
                    const email = target.email.value;
                    const password = target.password.value;

                    console.log(email);
                    console.log(password);

                }}
                >
                    <label>Ingrese mail</label>
                    <input name="email" type="email" className="w-1/2 h-8 bg-red-100 border-none"></input>

                    <label>Ingrese contraseña</label>
                    <input name="password" type="password" className="w-1/2 h-8 bg-red-100 border-none"></input>
                    <button type="submit" className="w-1/2 h-8 bg-green-200" />

                </form>

            </main>
        </>
    );
}