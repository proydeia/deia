import Image from "next/image";
import Mision from "./componenetes/mision";
import About from "./componenetes/about";

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
      <section className="hero-section md:flex justify-around items-center hidden w-full h-screen bg-fondo_light ">
        <div className="flex flex-col gap-2 h-1/2 ">
          <h1 className="animate-fade-left animate-once animate-duration-[4000ms] animate-ease-in text-6xl font-bold">
            DEIA
          </h1>
          <h2 className="font-bold text-4xl animate-fade-left animate-once animate-duration-[4000ms] animate-ease-in ">
            Innovación en cada respiro
          </h2>
          <div className="flex w-full">
            <button className="hover:scale-125 rounded-xl py-2 px-8 border-none mt-3 bg-secondary text-fondo_light">
              Inicio de Sesion
            </button>
            <button className="hover:scale-125 rounded-xl py-2 px-8 border-secondary border-2 mt-3 text-secondary ml-4">
              Como funciona
            </button>
          </div>
        </div>
        <div className="relative  h-11/12">
          <div className="absolute -top-10 -right-10 rounded-full ring-inset ring-primary ring-8  border-8 border-primary h-28 w-28 "></div>
          <div className="absolute z-10 top-36 rounded-full ring-inset ring-secondary ring-8  border-8 border-secondary h-32 w-32 "></div>
          <div className="absolute z-10 rounded-full bg-primary h-1/5 w-1/5"></div>
          <div className="absolute z-10  -right-40 -top-10 rounded-full bg-primary_light h-80 w-80 "></div>
          <Image
            src="/Frame9.png"
            alt="Mi imagen"
            layout="fixed"
            width={400}
            height={400}
            className="relative -top-10 z-20 animate-rotate-y animate-once animate-delay-[300ms] animate-ease-in-out animate-normal "
          />
        </div>
      </section>
      <section className="our-mission w-full bg-primary_light md:h-screen h-3/4 flex justify-center items-center">
        {/* Our Mission content */}
        <Mision />
      </section>

      {/* Add your content sections here */}
      <section className="about-us  flex justify-center items-center">
        {/* About Us content */}

        <About />
      </section>
    </main>
  );
}
