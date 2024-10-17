import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import Logout from "./signOut";

export default function Dropdown() {
  const handleSignOut = async () => {
    await signOut();
    redirect('./');
  };

  return (
    <details className="relative ">
      <summary className=" flex flex-row w-full px-4 text-black text-2xl rounded-md hover:bg-secondary hover:scale-105 hover:text-primary_light ">
      ☰
        {/*  Puedes usar un ícono SVG aquí */}
      </summary>

      <div className="absolute right-0 mt-2 w-48 bg-white p-4 rounded-md shadow-lg z-10 animate-fade-down animate-once animate-duration-[2000ms] animate-delay-1000 animate-ease-in-out animate-fill-both">
        <div className="py-1 ">
          <Logout/>
        </div>
      </div>
    </details>
  );
}
