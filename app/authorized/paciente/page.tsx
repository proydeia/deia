<<<<<<< HEAD
import NavbarA from "../Components/NavBar";

export default function IngresoPaciente() {
    return (
        <>
            
            <div className="flex flex-row justify-center items-center h-screen overflow-hidden">
                {/* aca va la previsualizacion */}
                <NavbarA/>
                <form className="relative flex flex-col justify-center items-center w-full h-full overflow-auto scrollbar-hide">
                    <div>Parte 1</div>
                    <div className="bg-black w-9/12 h-96"></div>
                    <div>Parte 2</div>
                    <div>Parte 3</div>
                </form>
=======
import NavbarA from "../Components/NavBar"
import {getPatientsList} from "@/app/actions/patient"
import { userId } from "@/app/actions/token";

export default async function ingresoPaciente() {

    const id = await userId();
    const patients = await getPatientsList(id as string);
    
    return (
        <>
            <NavbarA />
            <div className="flex justify-center items-center h-screen">
                <div className=" w-1/2 h-1/2 bg-primary rounded-lg">
                </div>
>>>>>>> b102a395d774d67e1afdadd34f2653fb65719a64
            </div>
        </>
    );
}
