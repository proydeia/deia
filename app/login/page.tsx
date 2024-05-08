'use client';
import Navbar from "../navBar";
import React, { useRef } from 'react'
import { useFormState } from "react-dom";
import { authenticate } from "./login_action";

export default function LoginPage() {

    const [state, formAction] = useFormState(authenticate, undefined);

    return (
        <>
            <Navbar />
            <main className="flex justify-center items-center h-full flex-col ">

                <h1 className="p-4 ">LoginPage</h1>
                <form 
                method="post" 
                className="flex flex-col items-center gap-4 w-1/2"
                action={formAction}>

                    <label>Ingrese mail</label>
                    <input name="user" id="user" type="text" className="w-1/2 h-8 bg-red-100 border-none"></input>
                    {state?.errors?.user && <p>{state.errors.user}</p>}

                    <label>Ingrese contraseña</label>
                    <input name="password" id="user" type="password" className="w-1/2 h-8 bg-red-100 border-none"></input>
                    {state?.errors?.password && <p>{state.errors.password}</p>}

                    <button type="submit" className="w-1/2 h-8 bg-green-200" />
                    {state?.message && <p>{state.message}</p>}

                </form>

            </main>
        </>
    );
}