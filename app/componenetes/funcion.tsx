import Image from "@/node_modules/next/image"
export default function Funcion() {
    return (
        <div className="bg-white md:w-10/12 w-full p-8 rounded-none md:rounded-xl shadow-none md:shadow-lg relative z-20">
            <h1 className="text-2xl sm:text-3xl font-black text-center  w-full mb-2 mt-4 font-subtitulo">Funcionalidades</h1>
            <p className="text-lg font-light text-center">Estas son algunas funcionalidades que podés encontrar en DEIA</p>
            <div className="flex flex-col md:flex-row gap-6 mt-10">

                <div className="flex flex-row  md:flex-col justify-center items-center gap-4 w-full bg-white shadow-lg py-4  rounded-xl">
                    {/* <div className="w-10 h-10 rounded-xl bg-third mt-6 mb-3"></div> */}
                    <Image
                        src="/res.png"
                        alt="Mi imagen"
                        layout="fixed"
                        width={45}
                        height={45}
                        className="relative top-0 -left-0 z-30 animate-rotate-y animate-once animate-delay-[300ms] animate-ease-in-out animate-normal "
                    />
                    <h2 className="text-lg font-bold text-center mb-0 md:mb-3">Resultados inmediatos</h2>
                    <p className="text-sm font-light text-center px-6 mb-6 hidden md:block">En tan solo algunos segundos, nuestra IA se encargará de aportar al médico un análisis de la espirometría. </p>
                </div>
                <div className="flex flex-row  md:flex-col justify-center items-center gap-4 w-full bg-white shadow-lg py-4 rounded-xl">
                    {/* <div className="w-10 h-10 rounded-xl bg-third mt-6 mb-3"></div> */}
                    <Image
                        src="/reg.png"
                        alt="Mi imagen"
                        layout="fixed"
                        width={45}
                        height={45}
                        className="relative top-0 -left-0 z-30 animate-rotate-y animate-once animate-delay-[300ms] animate-ease-in-out animate-normal "
                    />
                    <div>
                        <h2 className="text-lg font-bold text-center mb-0 md:mb-3">Resultados inmediatos</h2>

                    </div>
                    <p className="text-sm font-light text-center px-6 mb-6 hidden md:block">En tan solo algunos segundos, nuestra IA se encargará de aportar al médico un análisis de la espirometría. </p>
                </div>
                <div className="flex flex-row  md:flex-col justify-center items-center gap-4 w-full bg-white shadow-lg py-4 rounded-xl">
                    {/* <div className="w-10 h-10 rounded-xl bg-third mt-6 mb-3"></div> */}
                    <Image
                        src="/resp.png"
                        alt="Mi imagen"
                        layout="fixed"
                        width={45}
                        height={45}
                        className="relative top-0 -left-0 z-30 animate-rotate-y animate-once animate-delay-[300ms] animate-ease-in-out animate-normal "
                    />
                    <h2 className="text-lg font-bold text-center mb-0 md:mb-3">Resultados inmediatos</h2>
                    <p className="text-sm font-light text-center px-6 mb-6 hidden md:block">En tan solo algunos segundos, nuestra IA se encargará de aportar al médico un análisis de la espirometría. </p>
                </div>

            </div>

            {/* <p>En DEIA, nos comprometemos a mejorar la salud respiratoria de las personas a través de la innovación y la investigación. Nuestro objetivo es ayudar a las comunidades mediante el desarrollo y la implementación de diagnósticos de espirometrías basados en inteligencia artificial. Creemos que la tecnología puede transformar la atención médica, permitiendo diagnósticos más precisos y accesibles para todos. Nos dedicamos a seguir investigando y avanzando en este campo, para que cada persona tenga acceso a una mejor calidad de vida.</p> */}
        </div>
    )
}