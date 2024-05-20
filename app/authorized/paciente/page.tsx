import NavbarA from "../Components/NavBar"
import {getPatientsList} from "@/app/actions/medic"
import { userId } from "@/app/actions/token";

export default async function ingresoPaciente() {

    const id = await userId();
    const patients = await getPatientsList(id as string);
    
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