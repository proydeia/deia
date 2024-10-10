import Image from "next/image";
//hola
export default function About() {
  return (
    <div className="bg-white shadow-xl z-30 w-full md:w-10/12  rounded-xl flex flex-col items-center justify-center">
      <h1 className="text-2xl font-subtitulo sm:text-3xl font-bold text-center  w-full mb-4 mt-8">
        Conocé a nuestro equipo
      </h1>
      <div className="flex flex-row items-center justify-evenly m-8 gap-2 ">
        <div className="flex flex-col bg-white shadow-md shadow-primary_light p-4 sm:p-8 rounded-xl  w-full h-80 items-center justify-center ">
        <Image
            src="/JULI.png"
            alt="Mi imagen"
            layout="fixed"
            width={400}
            height={400}
          />
          <p className=" py-2 mt-5 sm:py-2 px-2 text-center font-bold font-subtitulo text-md sm:text-xl ">
            Julieta Guerson
          </p>
          <p className="text-sm font-subtitulo font-medium text-center">Desarrollo Front-End</p>
        </div>
        <div className="flex flex-col bg-white shadow-sm shadow-primary_light p-4 sm:p-8 w-full rounded-xl h-80 font-subtitulo items-center justify-center ">
        <Image
            src="/GORO.png"
            alt="Mi imagen"
            layout="fixed"
            width={400}
            height={400}
          />
          <p className="py-2 sm:py-2 px-2 text-center font-bold text-md sm:text-xl">
            Tomás Gorodetsky
          </p>
            <p className="text-sm font-subtitulo font-medium text-center">Desarrollador IA</p>
        </div>
        <div className="flex flex-col bg-white shadow-sm shadow-primary_light p-4 sm:p-8 w-full rounded-xl h-80 font-subtitulo items-center justify-center ">
        <Image
            src="/BENJA.png"
            alt="Mi imagen"
            layout="fixed"
            width={400}
            height={400}
          />
          <p className=" py-2 sm:py-2 px-2 text-center font-bold text-md sm:text-xl">
            Benjamín de Bárbara
          </p>
          <p className="text-sm font-subtitulo font-medium text-center">Desarrollo Back-End</p>
        </div>
        <div className="flex flex-col bg-white shadow-sm shadow-primary_light p-4 sm:p-8 w-full rounded-xl h-80 font-subtitulo items-center justify-center ">
        <Image
            src="/ABRIL.png"
            alt="Mi imagen"
            layout="fixed"
            width={400}
            height={400}
          />
          <p className=" py-2 mt-5 sm:py-2 px-2 text-center font-bold text-md sm:text-xl">
            Abril Erlijman
          </p>
          <p className="text-sm font-subtitulo font-medium text-center">Diseño UX/UI</p>
        </div>
      </div>
    </div>
  );
}
