import NavbarA from "../Components/NavBar"
import {getPatientsList} from "@/app/lib/db/schema"
import { auth } from "@/auth";
export default async function ingresoPaciente() {
    
    const session = await auth();
    const patients = await getPatientsList(session?.user?.id as string);
        
    return (
        <>
            <NavbarA />
            <div className="flex justify-center items-center h-screen">
                <div className=" w-1/2 h-1/2 bg-primary rounded-lg">
                {patients.map((patient) => (
                    <h1 key={patient.id}>{patient.name}</h1>
                ))}
                </div>
            </div>
        </>
    )
}