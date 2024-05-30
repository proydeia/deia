import NavbarA from "./Components/NavBar";
import Previsualizacion from "./Components/previsualisacion";
import { getUserList } from "../lib/db/schema";
import { GetServerSideProps } from "next";
import Navbar from "../navBar";
//import { useState } from "react";

export default function AuthorizedPage(){
   // const [componente,setComponente] = useState(0)

    const Cambiar_Componente = () => {
        //setComponente(1)
    }
    return (
        <>
            
            <main >
                <div className="flex h-screen">
                    {/* aca tiene que ir la lista de pacientes */}
                    <div className="w-1/2 bg-primary flex flex-col justify-center items-center">
                        <div className="font-sans">titulo</div>
                        <div>barra de busqueda</div>
                        <div>componente de lista</div>
                    </div>

                    {/* aca tiene que ir la previzualizacion */}
                    <div className="w-1/2 bg-secondary">prev</div>
                </div>
            </main>
        </>
    );
}



    
