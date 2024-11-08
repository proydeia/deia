import { useState } from "react"
import Id_paciente from "./id_paciente"
import Ver_Mas from "../mas_esp"
import AgregarEspiro from "@/app/medic/Components/forms/spirometryForm"
import { Dispatch, SetStateAction } from "react";

export default function Paciente({ pacienteId, Pagina }: {
    pacienteId: number; // ID passed as a prop
    Pagina: Dispatch<SetStateAction<number>>;
}) {
    const [Page, setPage] = useState(-1);
    const [Espiro, setEspiro] = useState(Number);
    const Patient_Page = () => {
        switch (Page) {
            case -1:
                return <Id_paciente pacienteId={pacienteId} Pagina={Pagina} Page={setPage} Espiro={setEspiro} />;

            case 0:
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