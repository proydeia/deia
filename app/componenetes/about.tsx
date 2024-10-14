import Image from "@/node_modules/next/image";
//hola
export default function About() {
  return (
    <div className="bg-white shadow-xl z-30 w-full md:w-10/12  rounded-xl flex flex-col items-center justify-center">
      <h1 className="text-2xl font-subtitulo sm:text-3xl font-bold text-center  w-full mb-4 mt-8">
        Conocé a nuestro equipo
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-1 items-center justify-evenly m-8 gap-2 ">
        <div className="flex flex-col bg-white shadow-sm shadow-primary_light p-4 sm:p-8 rounded-xl  w-full h-80 items-center justify-center ">
        <Image
            src="/JULI.png"
            alt="Mi imagen"
            layout="fixed"
            width={400}
            height={400}
          />
          <p className="mt-4 py-2  sm:py-2 px-2 text-center font-bold font-subtitulo text-md sm:text-xl ">
            Julieta Guerson
          </p>
          <p className="text-sm font-subtitulo font-medium text-center">Front-End</p>
        </div>
        <div className="flex flex-col bg-white shadow-sm shadow-primary_light p-4 sm:p-8 w-full rounded-xl h-80 font-subtitulo items-center justify-center ">
        <Image
            src="/GORO.png"
            alt="Mi imagen"
            layout="fixed"
            width={400}
            height={400}
          />
          <p className="mt-4 py-2 sm:py-2 px-2 text-center font-bold text-md sm:text-xl">
            Tomás Gorodetsky
          </p>
            <p className="text-sm font-subtitulo font-medium text-center">IA Developer</p>
        </div>
        <div className="flex flex-col bg-white shadow-sm shadow-primary_light p-4 sm:p-8 w-full rounded-xl h-80 font-subtitulo items-center justify-center ">
        <Image
            src="/BENJA.png"
            alt="Mi imagen"
            layout="fixed"
            width={400}
            height={400}
          />
          <p className="mt-4 py-2 sm:py-2 px-2 text-center font-bold text-md sm:text-xl">
            Benjamín de Bárbara
          </p>
          <p className="text-sm font-subtitulo font-medium text-center">Back-End</p>
        </div>
        <div className="flex flex-col bg-white shadow-sm shadow-primary_light p-4 sm:p-8 w-full rounded-xl h-80 font-subtitulo items-center justify-center ">
        <Image
            src="/ABRIL.png"
            alt="Mi imagen"
            layout="fixed"
            width={400}
            height={400}
          />
          <p className="mt-4 py-2  sm:py-2 px-2 text-center font-bold text-md sm:text-xl">
            Abril Erlijman
          </p>
          <p className="text-sm font-subtitulo font-medium text-center">UX/UI Designer</p>
        </div>
      </div>
    </div>
  );
}
