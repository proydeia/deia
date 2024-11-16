import { deleteSpirometry } from "@/app/api/spirometry";
import { deletePatient } from "@/app/api/patient";
import { useState } from "react";
//import { deleteMedic } from "@/app/api/admin";

export default function ByebyeButton({ tabla = "patient" || "spirometry" || "", id }: { tabla: string, id: string }) {
    const Persona = () =>{
    switch (tabla){
        case "patient":
            return "Paciente"
        case "spirometry":
            return "Espirometria"
        default:
            return "Médico"
    }
    
    }
    const erradicate = async () => {
        try {
            switch (tabla) {
                case "patient":
                    await deletePatient(id);
                    break;

                case "spirometry":
                    await deleteSpirometry(id);
                    break;

                case "medic":
                    //await deleteMedic(id);
                    break;
                default:
                    throw new Error("Invalid type");
            }
        }
        catch (error: unknown) {
            console.log(JSON.stringify(error))
            //alert("Error eliminando el paciente");
            return;
        }
        //mostrar lo que sea que haya que mostrar; recomiendo hacerlo bajo los propios casos del switch.
        return
    }

    return (
        <div className="container" >
            <button onClick={() => erradicate()} className="bg-red p-2 ml-2 rounded-sm ">
                Eliminar {Persona()}
            </button>
        </div>
    );
}