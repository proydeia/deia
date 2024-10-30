import { deleteSpirometry } from "@/app/api/medic/spirometry";
import { deletePatient } from "@/app/api/medic/patient";

export default function ByebyeButton({ tabla, id }: { tabla: string, id: string }) {
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
            return;
        }
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