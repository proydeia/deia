import NavbarA from "./Components/NavBar";
export default async function AuthorizedPage() {

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