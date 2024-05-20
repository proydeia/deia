import NavbarA from "./Components/NavBar";

export default async function AuthorizedPage() {

    const res = await fetch('http://127.0.0.1:8000/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }) 
    console.log(111, res);

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