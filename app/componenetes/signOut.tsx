import { signOut } from "@/auth"
import { userData } from "@/app/api/auth/sessionData";
import Link from "next/link";
export default function Logout() {
   
    return (
        <div className="flex flex-col gap-2 ">
            <form action={async () => {"use server"; await signOut({redirect: true, redirectTo: "/"}) }}>
                <button type="submit" className="bg-secondary py-2 w-full px-4 text-white hover:scale-105 hover:text-white rounded-md">
                    <p>
                    SignOut

                    </p>
                </button>
            </form>
            <Link
                    href="./medic"
                    className="bg-secondary text-center py-2 px-4 text-white hover:scale-105 hover:text-white rounded-md"
                  >
                   
                    Pacientes
            </Link>
        </div>
    )
}