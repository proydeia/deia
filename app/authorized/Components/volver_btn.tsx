import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

interface PaginaProps {
    Pagina: Dispatch<SetStateAction<string>>;
}

const Volver_btn = ({ Pagina }: PaginaProps) => {
    const [pag, setPag] = useState("")
    const handleVolver = () => {
        if (pag === "1") {
            setPag("default");
          } else if (pag === "2") {
            setPag("3");
          } else if (pag === "3") {
            setPag("default");
          }
        Pagina(pag);
    }


    return (
        <div onClick={handleVolver} className="bg-secondary px-8 py-2 rounded-md hover:bg-primary">
            <p>Volver</p>
        </div>
    );
};

export default Volver_btn;
