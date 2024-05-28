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
            </div>
        </>
    );
}
