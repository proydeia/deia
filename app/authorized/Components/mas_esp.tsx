import { Dispatch, SetStateAction } from "react";
import Volver_btn from "./volver_btn";
export default function Ver_Mas({ Pagina, Page }: {
    Pagina: Dispatch<SetStateAction<string>>
    Page: Dispatch<SetStateAction<string>>
}) {
    return (
        <div className="w-11/12 flex flex-col h-screen">
            <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4 px-4">Datos del Diagnóstico</p>

            <div className=" flex flex-col gap-4 justify-center items-center bg-primary_light py-4 rounded-sm h-4/5">
                <p className="text-xl sm:text-2xl font-bold text-left w-full mb-2 mt-4 px-4">Fecha: 32893884398</p>
                <div className="grid grid-cols-4 p-4 gap-4 justify-center overflow-y-auto h-96">
                    <div className="p-4  sm:p-8 w- max-h-10 sm:col-span-1 md:col-span-2 col-span-2 bg-primary flex flex-row gap-2 justify-center items-center">
                        <p className="font-semibold text-md text-center">FEV1:</p>
                        <p className="font-bold">1</p>
                    </div>
                    <div className="p-4  sm:p-8 w- max-h-10 sm:col-span-1 md:col-span-2 col-span-2 bg-primary flex flex-row gap-2 justify-center items-center">
                        <p className="font-semibold text-md">FEV1 LLN:</p>
                        <p className="font-bold">1</p>
                    </div>
                    <div className="p-4  sm:p-8 w- max-h-10 sm:col-span-1 md:col-span-2 col-span-2 bg-primary flex flex-row gap-2 justify-center items-center">
                        <p className="font-semibold text-md">FVC:</p>
                        <p className="font-bold">1</p>
                    </div>
                    <div className="p-4  sm:p-8 w- max-h-10 sm:col-span-1 md:col-span-2 col-span-2 bg-primary flex flex-row gap-2 justify-center items-center">
                        <p className="font-semibold text-md">FVC LLN:</p>
                        <p className="font-bold">1</p>
                    </div>
                    <div className="px-2 md:px-4 md:flex-row  flex flex-col py-2  col-span-2  bg-primary">
                        <p className="md:text-lg sm:text-xl font-semibold text-lg">Grado de Obstruccion por Análisis:</p>
                        <p className=" md:text-lg font-bold text-xl  sm:text-2xl">54%</p>
                    </div>
                    <div className="px-2 md:px-4 md:flex-row  flex flex-col py-2  col-span-2  bg-primary">
                        <p className="md:text-lg sm:text-xl font-semibold text-lg">Grado de Obstruccion por IA:</p>
                        <p className=" md:text-lg font-bold text-xl  sm:text-2xl">54%</p>
                    </div>
                    <div className="px-2 md:px-4 md:flex-row  flex flex-col py-2  col-span-2  bg-primary">
                        <p className="md:text-lg sm:text-xl font-semibold text-lg">Según el Analisis: </p>
                        <p className="md:text-lg font-bold text-xl  sm:text-2xl">No hay Obstruccion</p>
                    </div>
                    <div className="px-2 md:px-4 md:flex-row  flex flex-col py-2  col-span-2  bg-primary">
                        <p className="md:text-lg sm:text-xl font-semibold text-lg">Probabilidad de que haya restriccion :</p>
                        <p className="md:text-lg font-bold text-xl  sm:text-2xl">54%</p>
                    </div>

                    <div className="bg-primary col-span-4 p-4">

                        <p className="font-bold text-lg sm:text-xl">Información Extra:</p>
                        <p className="sm:text-xl font-medium text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                    </div>

                </div>
                {/* <button onClick={() => Pagina("2")}>Volver</button> */}
                <Volver_btn Pagina={() => Pagina("1")} />
            </div>
        </div>
    )
}