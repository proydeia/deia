import { useState } from "react"
import Id_paciente from "./id_paciente"
import Ver_Mas from "./mas_esp"
import AgregarEspiro from "@/app/componenetes/agregar_s_form"
import { Dispatch, SetStateAction } from "react";

export default function Paciente({ pacienteId, Pagina }: {
    pacienteId: string; // ID passed as a prop
    Pagina: Dispatch<SetStateAction<string>>;
}) {

    const [Page, setPage] = useState("1");
    const [Espiro, setEspiro] = useState("");
    // console.log("Id espiro "+Espiro)
    const Patient_Page = () => {
        switch (Page) {
            case "1":
                return <Id_paciente pacienteId={pacienteId} Pagina={Pagina} Page={setPage} Espiro={setEspiro} />;

            case "2":
                return <AgregarEspiro Pagina={Pagina} id={pacienteId} Page={setPage} />;

            default:
                return <Ver_Mas Pagina={Pagina} Page={setPage} pacienteId={pacienteId} EspiroId={Espiro}/>;
        }
    }


    return (
        <>
            <Patient_Page />
        </>
    )
}