import Image from "@/node_modules/next/image";
export default function Contacto() {
  return (
    <div className="bg-white md:w-10/12 w-full px-8 pt-4 pb-10 rounded-none md:rounded-xl shadow-none md:shadow-lg relative z-30 flex flex-col justify-center items-start gap-10">
      <div className="">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-start  w-full mb-2 mt-4 font-subtitulo">
          Contáctese con nosotros!
        </h1>
        <p className="text-lg font-light text-start">
          ¿Tenés alguna pregunta? Nuestro equipo está acá para ayudar.
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-start gap-4 ">
        <div className="w-full md:w-1/2 flex flex-col items-start gap-4 ml-0 md:ml-6">
        {/*
          <div className="flex flex-row gap-2 justify-center items-center ">
          <Image
            src="/cel.png"
            alt="Mi imagen"
            layout="fixed"
            width={25}
            height={25}
          />
            <p className="text-start font-subtitulo font-medium">+4394834948</p>
          </div>
        */}
          <div className="flex flex-row gap-2 justify-center items-start">
          <Image
            src="/mail.png"
            alt="Mi imagen"
            layout="fixed"
            width={25}
            height={25}
          />
            <p className="text-start font-subtitulo font-medium">proydeia@gmail.com</p>
          </div>
        </div>
        {/*
        <div className="w-full md:w-1/2 flex flex-col items-start gap-2">
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full md:w-3/5 rounded-t-md bg-white drop-shadow-md  border-b-2 border-b-secondary py-3 px-6"
          />
          <input
            type="text"
            placeholder="Correo electrónico"
            className="w-full md:w-3/5 rounded-t-md bg-white drop-shadow-md  border-b-2 border-b-secondary py-3 px-6"
          />
          <button className="rounded-md bg-secondary text-white hover:transition-transform hover:scale-105 py-2 px-6 mt-4">Enviar</button>
        </div>
        */}
      </div>

      {/* <p>En DEIA, nos comprometemos a mejorar la salud respiratoria de las personas a través de la innovación y la investigación. Nuestro objetivo es ayudar a las comunidades mediante el desarrollo y la implementación de diagnósticos de espirometrías basados en inteligencia artificial. Creemos que la tecnología puede transformar la atención médica, permitiendo diagnósticos más precisos y accesibles para todos. Nos dedicamos a seguir investigando y avanzando en este campo, para que cada persona tenga acceso a una mejor calidad de vida.</p> */}
    </div>
  );
}
