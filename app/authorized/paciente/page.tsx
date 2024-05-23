import NavbarA from "../Components/NavBar"
export default function ingresoPaciente() {

    return (
        <>
            <NavbarA />
            <div className="flex justify-center items-center h-screen">
                <div className=" w-full bg-primary rounded-lg sm:w-1/2">
                    <form className="bg-red-400 flex flex-col justify-center items-center h-full" >
                        <div>Parte 1</div>
                        <div>Parte 2</div>
                        <div>Parte 3</div>
                    </form>
                </div>

            </div>
        </>
    )
}