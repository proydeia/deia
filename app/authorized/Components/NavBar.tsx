import Logout from "../logOut_button"

export default function NavbarA(){
    return(
        <>
         <nav>
             <div className="relative items-center sm:fixed gap-5 top-0 left-0 sm:h-screen sm:w-1/12 m-0 flex  flex-row sm:flex-col shadow-lg bg-teal-100 hover:bg-green-500 w-screen h-20">
                 <p>DEIA</p>
                 <Logout/>
                 <button>Boton 1</button>
                 <button>Boton 2</button>
             </div>
         </nav>
        </>
    )
}