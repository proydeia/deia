import Image from "next/image";
import Mision from "./componenetes/mision";
import About from "./componenetes/about";

export default function Home() {
  return (
    <main>
      <section className="hero-section flex justify-around items-center mt-4  h-screen">
        <Image
          src="/Frame9.png"
          alt="Mi imagen"
          layout="fixed"
          width={300}
          height={300}
          className="animate-rotate-y animate-once animate-delay-[300ms] animate-ease-in-out animate-normal"
        />
        <h1 className="animate-fade-left animate-once animate-duration-[4000ms] animate-ease-in text-6xl">DEIA</h1>
      </section>
      <section className="our-mission w-full bg-primary_light h-screen flex justify-center items-center">
        {/* Our Mission content */}
        <Mision/>
      </section>

      {/* Add your content sections here */}
      <section className="about-us  flex justify-center items-center">
        {/* About Us content */}
    
      <About/>
      </section>
    </main>
    
  );
}
