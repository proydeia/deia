import Link from "@/node_modules/next/link"
export default function Agregar() {
    return (
        <>
        <Link href="/authorized/paciente">
            <button className="bg-teal-500 p-4 rounded-lg hover:bg-teal-600">Agregar paciente</button>
            </Link>
        </>
    )
}