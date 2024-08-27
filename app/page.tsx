import Image from "next/image";

import { getSession } from "./api/userData";

export default function Home() {
  const session = getSession(); 
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
        <h1 className="animate-pulse animate-infinite animate-delay-300 animate-ease-linear animate-normal text-6xl">DEIA</h1>
      </section>

      {/* Add your content sections here */}
      <section className="about-us">
        {/* About Us content */}
        <p>Quienes somos</p>
      </section>
      <section className="our-mission">
        {/* Our Mission content */}
        <p>Nuestra Mision</p>
      </section>
    </main>
    
  );
}
