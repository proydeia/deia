import { createSpirometry } from "../actions/medic";
import { checkIfExists } from "../lib/db/schema";
import NavbarA from "./Components/NavBar";


export default async function AuthorizedPage() {

    const res = checkIfExists("spirometries", "newhvjpfqcow9u02jf498hvbwd2")
    console.log(res);
    return (
        <>
            <main>
                <div className="relative grid justify-center grid-cols-12  gap-4">
                    <NavbarA />
                    <div className="bg-primary  items-center h-screen col-start-3 col-end-13">Esto contendra la lista de pacientes </div>
                </div>
            </main>
        </>
    );
}