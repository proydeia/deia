import { deleteSpirometry } from "#/medic/spirometry";
import { deletePatient } from "@/app/api/medic/patient";

export default function ByebyeButton({ tabla, id }: { tabla: string, id: number }) {
    console.log(tabla, id);
    const Persona = () =>{
    switch (tabla){
        case "patient":
            return "Paciente"
        case "spirometry":
            return "Espirometria"
        case "medic":
            return "Médico"
        default:
            new Error("Invalid type");
    }
    
    }
    const erradicate = async () => {
        try {
            switch (tabla) {
                case "patient":
                    await deletePatient(id);
                    break;

                case "spirometry":
                    console.log("id: ", id)
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
            console.log(error);
            return;
        }
        return
    }

    return (
        <div className="container" >
            <button onClick={() => erradicate()} className="bg-red p-2 ml-2 rounded-lg shadow-lg ">
                Eliminar {Persona()}
            </button>
        </div>
    );
}