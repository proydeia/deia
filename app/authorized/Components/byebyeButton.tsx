import { deleteSpirometry } from "@/app/api/spirometry";
import { deletePatient } from "@/app/api/patient";
//import { deleteMedic } from "@/app/api/admin";

export default function ByebyeButton(type: string = "patient" || "spirometry" || "", id: string){

    const erradicate = async () => {
        try {
            switch (type) {
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
        catch (error:unknown) {
            alert("Error eliminando el paciente");
            return;
        }
        //mostrar lo que sea que haya que mostrar; recomiendo hacerlo bajo los propios casos del switch.
        return
    }
  
    return (
    <div className="container">
      <button onClick={() => erradicate()}>
        Eliminar
      </button>
    </div>
  );
}