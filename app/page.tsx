import Navbar from "./navBar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <div className="flex justify-around items-center mt-4">
      <Image
                  src="/Frame9.png"
                  alt="Mi imagen"
                  layout="fixed"
                  width={300}
                  height={300}
                  className="animate-rotate-y animate-once animate-delay-[300ms] animate-ease-in animate-normal"
                />
      <h1 className="animate-pulse animate-infinite animate-delay-300 animate-ease-linear animate-normal text-6xl">DEIA</h1>
      </div> 
    </main>
    
  );
}
