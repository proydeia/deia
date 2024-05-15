import Logout from "./logOut_button"
import Agregar from "./Btn_agregarPac"
import Link from "@/node_modules/next/link"
export default function NavbarA() {
    return (
        <>
            <nav>
                <div className="fixed items-center sm:fixed gap-5 top-0 left-0 sm:h-screen sm:w-2/12 m-0 flex  flex-row sm:flex-col shadow-lg bg-secondary hover:bg-primary w-screen h-20">
                    <p>DEIA</p>
                    <Logout />
                    <Agregar />
                    <Link href="./">Back</Link>
                </div>
            </nav>
        </>
    )
}