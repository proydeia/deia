"use client";
import Navbar from "@/app/navBar";
import { useFormState } from "react-dom";
import { createSpirometry } from "@/app/api/spirometry";
export default function IngresoPaciente() {
    const [state, actions] = useFormState(createSpirometry, undefined);
    return (
        <form action={actions}>
            <input type="hidden" name="id" id="id" value={"6669c549-fc97-4016-ab02-45c4b464a500"} />
            <input type="number" step={1} name="sexo" id="sexo"  />
            <input type="number" step={.1} name="altura" id="altura" />
            <input type="number" step={.1} name="peso" id="peso" />
            <input type="date" name="nacimiento" id="nacimiento"/>
            <input type="number" step={.1} name="fev1" id="fev1" />
            <input type="number" step={.1} name="fev1_lln" id="fev1_lln" />
            <input type="number" step={.1} name="fvc" id="fvc" />
            <input type="number" step={.1} name="fvc_lln" id="fvc_lln" />
            <input type="submit"/>
        </form>
    )
}