import NavbarA from "./Components/NavBar";
export default async function AuthorizedPage() {

    return(
        <>
        <main>
            <div className="relative grid justify-center grid-cols-12 gap-4">
        <NavbarA/>
                
                <div className="bg-teal-200 w-10/12 items-center h-screen col-start-3 col-end-12">Esto contendra la lista de pacientes </div>
            </div>
        </main>
        </>
    );
}