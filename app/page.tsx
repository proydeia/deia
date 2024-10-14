import Image from "@/node_modules/next/image"

import About from "./componenetes/about";
import Funcion from "./componenetes/funcion";
import Presicion from "./componenetes/precicion";
import Tutorial from "./componenetes/tutorial";
import Contacto from "./componenetes/contacto";
//hola hola
export default function Home() {
  return (
    <main className="flex flex-col justify-center bg-fondo_light ">
      <section className="relative hero-section md:hidden flex justify-center items-center flex-col mt-36 mx-8 ">
        <div className="flex flex-col w-screen justify-center p-4 gap-4">
          <h1 className="font-titulo font-bold text-6xl text-center">DEIA</h1>
          <h2 className="font-subtitulo font-semibold text-4xl text-center">Innovación en cada respiro</h2>
          <p className="font-subtitulo font-medium text-xl text-center">Diagnóstico de Espirometrías con Inteligencia Artificial</p>
          <div className="flex flex-col justify-center items-center gap-2">
            <button className="hover:scale-105 rounded-xl py-2 px-8 border-none mt-3 bg-secondary text-fondo_light font-subtitulo">Inicio de Sesión</button>
            <button className="hover:scale-125 rounded-xl py-2 px-8 border-secondary border-2 mt-3 text-secondary  font-subtitulo">Como funciona</button>
          </div>
        </div>
        {/* circulos */}
        <div className="relative">
           <div className="absolute z-20 top-36 right-60 rounded-full ring-inset ring-third ring-4  border-4 border-third h-14 w-14 "></div> 
          <div className="absolute z-20 top-44   -right-20 rounded-full bg-primary h-20 w-20"></div>
          <div className="absolute z-10  -right-14 top-12 rounded-full bg-primary_light h-80 w-80 "></div> 
          <Image
           src="/Frame9.png"
           alt="Mi imagen"
           layout="fixed"
           width={200}
           height={200}
           className="relative top-0 -left-0 z-30 animate-rotate-y animate-once animate-delay-[300ms] animate-ease-in-out animate-normal "
         /> 

        </div>
      </section>
      <section className="hero-section z-30 md:flex justify-around items-center hidden w-full pt-28 pb-0  bg-fondo_light ">
        <div className="flex flex-col gap-2 h-1/2 ">
          <h1 className="font-titulo animate-fade-left animate-once animate-duration-[4000ms] animate-ease-in text-6xl font-bold">
            DEIA
          </h1>
          <h2 className="font-bold text-4xl font-subtitulo animate-fade-left animate-once animate-duration-[4000ms] animate-ease-in ">
            Innovación en cada respiro
          </h2>
          <div className="flex w-full">
            <button className="hover:scale-105 rounded-xl py-2 px-8 border-none mt-3 bg-secondary text-fondo_light font-subtitulo">
              Inicio de Sesion
            </button>
            <button className="hover:scale-105 rounded-xl py-2 px-8 border-secondary border-2 mt-3 text-secondary ml-4 font-subtitulo">
              Como funciona
            </button>
          </div>
        </div>
        <div className="relative  h-11/12">
          <div className="absolute z-10 top-80 -right-10 rounded-full ring-inset ring-third ring-8  border-8 border-third h-28 w-28 "></div>
          <div className="absolute z-10 top-52   -right-40 rounded-full ring-inset ring-primary ring-8  border-8 border-primary h-32 w-32 "></div>
          <div className="absolute z-20 top-44 -right-36 rounded-full bg-primary h-1/5 w-1/5"></div>
          <div className="absolute z-4  -right-40 top-20 rounded-full bg-primary_light h-80 w-80 "></div>
          <Image
            src="/Frame9.png"
            alt="Mi imagen"
            layout="fixed"
            width={400}
            height={400}
            className="relative -top-10 z-5 animate-rotate-y animate-once animate-delay-[300ms] animate-ease-in-out animate-normal "
          />
        </div>
      </section>
      <section className="our-mission relative pt-10 w-full bg-fondo_light pb-0 md:pb-10 flex justify-center items-center">
        {/* Our Mission content */}
        <Funcion />
        <div className="hidden md:block absolute z-10  bottom-80 -left-9 rounded-full ring-inset ring-third ring-8  border-8 border-third h-20 w-20 "></div>
        <div className="hidden md:block absolute z-10 -bottom-24 -left-20  rounded-full bg-primary_light h-80 w-80 "></div>
        <div className="hidden md:block absolute z-10  -bottom-10 -left-9  rounded-full ring-inset ring-primary ring-8  border-8 border-primary h-32 w-32 "></div>
        <div className="hidden md:block absolute z-10  bottom-48 left-10  rounded-full bg-primary h-20 w-20"></div>
      </section>
      <section className=" relative w-full pb-0 md:pb-10 flex justify-center items-center">
        {/* Our Mission content */}
        <Presicion />
        <div className="hidden md:block absolute z-10  -bottom-40 -right-9 rounded-full ring-inset ring-primary ring-8  border-8 border-primary h-20 w-20 "></div>
        <div className="hidden md:block absolute z-10 -bottom-32 -right-20  rounded-full bg-primary_light h-80 w-80 "></div>
        {/* <div classNahidden md:block me="absolute z-10  -bottom-10 -left-9  rounded-full ring-inset ring-primary ring-8  border-8 border-primary h-32 w-32 "></div> */}
        <div className="hidden md:block absolute z-10  bottom-40 -right-1  rounded-full bg-primary h-20 w-20"></div>
      </section>

      {/* Add your content sections here */}
      <section className="relative w-full bg-fondo_light pb-0 md:pb-10 flex justify-center items-center ">
        {/* About Us content */}

        <Tutorial />
      </section>
      <section className="relative about-us w-full bg-fondo_light pb-0 md:pb-10 flex justify-center items-center">
        {/* About Us content */}
        <About />
        <div className="hidden md:block absolute z-10  -bottom-10 left-5 rounded-full ring-inset ring-primary_light ring-8  border-8 border-primary_light h-16 w-16 "></div>
        <div className="hidden md:block absolute z-10  bottom-9 -left-16 rounded-full ring-inset ring-primary ring-8  border-8 border-primary h-32 w-32 "></div>
      </section>
      <section className="relative about-us w-full bg-fondo_light pb-0 md:pb-10 flex justify-center items-center">
        {/* About Us content */}
        <div className="hidden md:block absolute z-10 bottom-52 -right-28  rounded-full bg-primary_light h-80 w-80 "></div>
        <Contacto />
      </section>
    </main>
  );
}
