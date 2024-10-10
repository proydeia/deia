import Image from "next/image";
import About from "./componenetes/about";
import Funcion from "./componenetes/funcion";
import Presicion from "./componenetes/precicion";
import Tutorial from "./componenetes/tutorial";
import Contacto from "./componenetes/contacto";
//hola
export default function Home() {
  return (
    <main>
      <section className="relative hero-section md:hidden flex justify-start items-center flex-col">
        <div className="custom-shape-divider-bottom-1728252665 drop-shadow-2xl shadow-white">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <h1 className="relative right-20 top-20 animate-fade-left animate-once animate-duration-[4000ms] animate-ease-in text-3xl">
          Bienvenidos a DEIA
        </h1>
        <Image
          src="/medica_1.jpg"
          alt="Medica"
          layout="fixed"
          width={1000}
          height={1000}
          className="w-full "
        />
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
            <button className="hover:scale-125 rounded-xl py-2 px-8 border-secondary border-2 mt-3 text-secondary ml-4 font-subtitulo">
              Como funciona
            </button>
          </div>
        </div>
        <div className="relative  h-11/12">
          <div className="absolute z-10 top-80 -right-10 rounded-full ring-inset ring-third ring-8  border-8 border-third h-28 w-28 "></div>
          <div className="absolute z-10 top-52   -right-40 rounded-full ring-inset ring-primary ring-8  border-8 border-primary h-32 w-32 "></div>
          <div className="absolute z-20 top-8 -right-24 rounded-full bg-primary h-1/5 w-1/5"></div>
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
      <section className="our-mission relative pt-10 w-full bg-fondo_light pb-10 flex justify-center items-center">
        {/* Our Mission content */}
        <Funcion />
        <div className="absolute z-10  bottom-80 -left-9 rounded-full ring-inset ring-third ring-8  border-8 border-third h-20 w-20 "></div>
        <div className="absolute z-10 -bottom-24 -left-20  rounded-full bg-primary_light h-80 w-80 "></div>
        <div className="absolute z-10  -bottom-10 -left-9  rounded-full ring-inset ring-primary ring-8  border-8 border-primary h-32 w-32 "></div>
        <div className="absolute z-10  bottom-48 left-10  rounded-full bg-primary h-20 w-20"></div>
      </section>
      <section className=" relative w-full bg-fondo_light  pb-10 flex justify-center items-center">
        {/* Our Mission content */}
        <Presicion />
        <div className="absolute z-10  -bottom-40 -right-9 rounded-full ring-inset ring-primary ring-8  border-8 border-primary h-20 w-20 "></div>
        <div className="absolute z-10 -bottom-32 -right-20  rounded-full bg-primary_light h-80 w-80 "></div>
        {/* <div className="absolute z-10  -bottom-10 -left-9  rounded-full ring-inset ring-primary ring-8  border-8 border-primary h-32 w-32 "></div> */}
        <div className="absolute z-10  bottom-40 -right-1  rounded-full bg-primary h-20 w-20"></div>
      </section>

      {/* Add your content sections here */}
      <section className="relative w-full bg-fondo_light pb-10 flex justify-center items-center">
        {/* About Us content */}

        <Tutorial />
      </section>
      <section className="relative about-us w-full bg-fondo_light pb-10 flex justify-center items-center">
        {/* About Us content */}
        <About />
        <div className="absolute z-10  -bottom-10 left-5 rounded-full ring-inset ring-primary_light ring-8  border-8 border-primary_light h-16 w-16 "></div>
        <div className="absolute z-10  bottom-9 -left-16 rounded-full ring-inset ring-primary ring-8  border-8 border-primary h-32 w-32 "></div>
      </section>
      <section className="relative about-us w-full bg-fondo_light pb-10 flex justify-center items-center">
        {/* About Us content */}
        <div className="absolute z-10 bottom-52 -right-28  rounded-full bg-primary_light h-80 w-80 "></div>
        <Contacto />
      </section>
    </main>
  );
}
