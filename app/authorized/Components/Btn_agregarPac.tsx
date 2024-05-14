'use client'
import Link from "@/node_modules/next/link"
import ingresoPaciente from "../Paciente/paciente"
export default function Agregar() {
    return (
        <>
        <Link href="Paciente/paciente">
            <button className="bg-teal-500 p-4 rounded-lg hover:bg-teal-600">Agregar paciente</button>
            </Link>
        </>
    )
}