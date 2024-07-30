import { Dispatch, SetStateAction } from "react";
export default function Ver_Mas({ Pagina }: { Pagina: Dispatch<SetStateAction<string>> }) {
    return (
        <div className="w-11/12 flex flex-col">
            <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4 px-4">Datos del Diagnóstico</p>

            <div className=" flex flex-col gap-4 justify-center items-center bg-primary_light py-4 rounded-sm">
                <p className="text-xl sm:text-2xl font-bold text-left w-full mb-2 mt-4 px-4">Fecha: 32893884398</p>
                <div className="grid grid-cols-4 p-4 gap-4 justify-center">
                    <div className="p-8 w-30 bg-primary flex flex-col">
                        <p className="font-semibold text-md">FEV1:</p>
                        <p className="font-bold">1</p>
                    </div>
                    <div className="p-8 w-30 bg-primary flex flex-col">
                        <p className="font-semibold text-md">FEV1 LLN:</p>
                        <p className="font-bold">1</p>
                    </div>
                    <div className="p-8 w-30 bg-primary flex flex-col">
                        <p className="font-semibold text-md">FVC:</p>
                        <p className="font-bold">1</p>
                    </div>
                    <div className="p-8 w-30 bg-primary flex flex-col">
                        <p className="font-semibold text-md">FVC LLN:</p>
                        <p className="font-bold">1</p>
                    </div>
                    <div className="px-8 py-4 col-span-2 bg-primary">
                        <p className="font-semibold text-xl">Grado de Obstruccion por Análisis:</p>
                        <p className="font-bold text-2xl">54%</p>
                    </div>
                    <div className="px-8 py-4 col-span-2 bg-primary">
                        <p className="font-semibold text-xl">Grado de Obstruccion por IA:</p>
                        <p className="font-bold text-2xl">54%</p>
                    </div>
                    <div className="px-8 py-4 col-span-2 bg-primary">
                        <p className="font-semibold text-xl">Según el Analisis: </p>
                        <p className="font-bold text-2xl">No hay Obstruccion</p>
                    </div>
                    <div className="px-8 py-4 col-span-2 bg-primary">
                        <p className="font-semibold text-xl">Probabilidad de que haya restriccion :</p>
                        <p className="font-bold text-2xl">54%</p>
                    </div>

                    <div className="bg-primary col-span-4 p-4">

                        <p>Información Extra:</p>
                        <p>Lorem Ipsum</p>
                    </div>

                </div>
                <button onClick={() => Pagina("2")}>Volver</button>
            </div>
        </div>
    )
}