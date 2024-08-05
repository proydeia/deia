import { Dispatch, SetStateAction } from "react";
import Volver_btn from "./volver_btn";
export default function Ver_Mas({ Pagina }: { Pagina: Dispatch<SetStateAction<string>> }) {
    return (
        <div className="w-11/12 flex flex-col h-screen">
            <p className="text-2xl sm:text-3xl font-bold text-left text-primary_light w-full mb-4 mt-4 px-4 ">Datos del Diagnóstico</p>

            <div className=" flex flex-col  justify-center items-center bg-primary_light py-4 rounded-sm ">
                <p className="text-xl sm:text-2xl font-bold text-left w-full mb-2 mt-8 px-4">Fecha: 32893884398</p>
                <div className="grid grid-cols-4 p-4 gap-4 justify-center max-h-[400px] overflow-y-auto">
                    <div className="p-4 w-30 sm:col-span-1 col-span-2 bg-primary flex flex-col">
                        <p className="font-semibold text-md">FEV1:</p>
                        <p className="font-bold text-lg">1</p>
                    </div>
                    <div className="p-4 w-30 sm:col-span-1 col-span-2 bg-primary flex flex-col">
                        <p className="font-semibold text-md">FEV1 LLN:</p>
                        <p className="font-bold text-lg">1</p>
                    </div>
                    <div className="p-4 w-30 sm:col-span-1 col-span-2 bg-primary flex flex-col">
                        <p className="font-semibold text-md">FVC:</p>
                        <p className="font-bold text-lg">1</p>
                    </div>
                    <div className="p-4 w-30 sm:col-span-1 col-span-2 bg-primary flex flex-col">
                        <p className="font-semibold text-md">FVC LLN:</p>
                        <p className="font-bold text-lg">1</p>
                    </div>
                    <div className="px-4 py-2 sm:px-8 sm:py-4 col-span-2  bg-primary">
                        <p className="sm:text-xl font-semibold text-lg">Grado de Obstruccion por Análisis:</p>
                        <p className=" font-bold text-xl sm:text-2xl">54%</p>
                    </div>
                    <div className="px-4 py-2 sm:px-8 sm:py-4 col-span-2  bg-primary">
                        <p className="sm:text-xl font-semibold text-lg">Grado de Obstruccion por IA:</p>
                        <p className=" font-bold text-xl sm:text-2xl">54%</p>
                    </div>
                    <div className="px-4 py-2 sm:px-8 sm:py-4 col-span-2  bg-primary">
                        <p className="sm:text-xl font-semibold text-lg">Según el Analisis: </p>
                        <p className=" font-bold text-xl sm:text-2xl">No hay Obstruccion</p>
                    </div>
                    <div className="px-4 py-2 sm:px-8 sm:py-4 col-span-2  bg-primary">
                        <p className="sm:text-xl font-semibold text-lg">Probabilidad de que haya restriccion :</p>
                        <p className=" font-bold text-xl sm:text-2xl">54%</p>
                    </div>

                    <div className="bg-primary col-span-4 p-4">

                        <p className="font-bold text-xl sm:text-2xl">Información Extra:</p>
                        <p className="sm:text-lg font-medium text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                    </div>

                </div>
                {/* <button onClick={() => Pagina("2")}>Volver</button> */}
                <div className="mt-4">

                <Volver_btn Pagina={() => Pagina("default")}/>
                </div>
            </div>
        </div>
    )
}