import { getSpirometriesList } from "@/app/actions/spirometry";
import { getPatientsList } from "@/app/actions/patient";
import NavbarA from "./Components/NavBar";

export default async function AuthorizedPage() {
    
    const a = await getPatientsList();
    const b = await getSpirometriesList("mc82fy9hrcn489pnyrcf489n8pq23");
    return (
        <>
            <main>
                <div className="relative grid justify-center grid-cols-12  gap-4">
                    <NavbarA />
                    <div className="bg-primary  items-center h-screen col-start-3 col-end-13">Esto contendra la lista de pacientes
                        <h1>
                            {b.map((spirometry) => (
                                <div key={spirometry.id}>
                                    <p>{spirometry.patient}</p>
                                </div>
                            ))}
                        </h1> 
                    </div>
                </div>
            </main>
        </>
    );
}