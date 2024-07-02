import Navbar from "@/app/navBar";
import {getPacientsList, getPatient} from "@/app/api/patient"
import { userId } from "@/app/api/token";
import { writeJSON } from "@/ds/writeDatadump";
import { getSpirometriesList } from "@/app/api/spirometry";
export default async function ingresoPaciente() {

    const id = await userId();
    const patients = await getPatient(id as string);
    writeJSON();
        const b = await getSpirometriesList("mc82fy9hrcn489pnyrcf489n8pq23");
    
//     <h1>
//     {b.map((spirometry) => (
//         <div key={spirometry.id}>
//             <p>{spirometry.patient}</p>
//         </div>
//     ))}
// </h1> 
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center h-screen">
                <div className=" w-1/2 h-1/2 bg-primary rounded-lg">
                </div>
            </div>
        </>
    )
}