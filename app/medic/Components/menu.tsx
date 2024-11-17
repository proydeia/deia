import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Logout from "./logOut_button";

export default function Dropdown() {
  const handleSignOut = async () => {
    await signOut();
    redirect('./');
  };

  return (
    <details className="relative ">
      <summary className=" flex flex-row w-full px-4  text-2xl rounded-md hover:bg-white hover:text-primary">
      ☰
        {/*  Puedes usar un ícono SVG aquí */}
      </summary>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
        <div className="py-1">
          <Logout/>
        </div>
      </div>
    </details>
  );
}
