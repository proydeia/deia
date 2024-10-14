import Image from "@/node_modules/next/image"
export default function Tutorial() {
    return (
        
        <div className="bg-white md:w-10/12 w-full p-8 rounded-xl shadow-lg relative z-30 hidden flex-row items-center gap-4 md:flex ">
        <div className="w-5/12">
        <Image
        src="/Visuals.png"
        alt="Mi imagen"
        layout="fixed"
        width={400}
        height={400}
      />
        </div>
        <div className="w-7/12">

        <h1 className="text-2xl sm:text-3xl font-extrabold text-start  w-full mb-2 mt-4 font-subtitulo">Tutorial</h1>
        <p className="text-lg font-light text-start">Un breve video donde se muestra como se usa DEIA </p>
        </div>
       
        {/* <p>En DEIA, nos comprometemos a mejorar la salud respiratoria de las personas a través de la innovación y la investigación. Nuestro objetivo es ayudar a las comunidades mediante el desarrollo y la implementación de diagnósticos de espirometrías basados en inteligencia artificial. Creemos que la tecnología puede transformar la atención médica, permitiendo diagnósticos más precisos y accesibles para todos. Nos dedicamos a seguir investigando y avanzando en este campo, para que cada persona tenga acceso a una mejor calidad de vida.</p> */}
    </div>
    )
}