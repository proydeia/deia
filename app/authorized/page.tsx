import NavbarA from "./Components/NavBar";
import { auth } from "@/auth";
import { getUserList } from "../lib/db/schema";
export default async function AuthorizedPage() {
    console.log(await auth())
    const users = await getUserList();

    return(
        <>
        <main>
            <div className="relative flex justify-center flex-col items-center">
        <NavbarA/>
                <h1>Mostrar lista de pacientes</h1>
                <div className="bg-teal-200 w-10/12 items-center h-screen">Esto contendra la lista de pacientes </div>
            </div>
        </main>
        </>
    );
}