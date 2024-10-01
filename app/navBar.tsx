"use server";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import Logout from "./medic/Components/logOut_button";
import { link } from "fs";
import Dropdown from "./medic/Components/menu";


export default async function Navbar() {
  // const [isClick, setisClick] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [username, setUsername] = useState("");
  // const [session, setSession] = useState<Session | null>(null);

  // const toggleNavBar = (): void => {
  //   setisClick(!isClick);
  // };

  //  useEffect(() => {
  //    const fetchSession = async () => {
  //     const sesion = async() => await getSession()
  //     // const session = await auth();
  //     console.log("Esta es la sesion:  " + sesion);
  //     setSession(session);
  //   };

  //    fetchSession();
  //  }, []);

  const session = await auth();
  console.log("sesion", session);
  return (
    <>
      <nav className="bg-white bg-fixed shadow-lg fixed top-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-center w-full sm:items-start">
              <div className="flex-shrink-0 flex flex-row gap-2 items-center">
                <Image
                  src="/Frame9.png"
                  alt="Mi imagen"
                  layout="fixed"
                  width={30}
                  height={30}
                />
                <Link href="/" className=" text-center">
                  DEIA
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className=" flex items-center justify-center px-4 py-2  rounded-md  space-x-4 ">
                {await auth() ? (
                  <Dropdown/>
                  
                ) : (
                  <Link
                    href="./login"
                    className="bg-secondary py-2 px-4 text-white hover:bg-white hover:text-primary rounded-md"
                  >
                    Login
                  </Link>

                )}
              </div>
            </div>
            {/* <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-white md:text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleNavBar}
              > */}
            {/* {isClick ? (
                  <div className="bg-red-400">Logo1</div>
                ) : (
                  <div className="bg-green-600">Logo2</div>
                )}
              </button>
            </div>
          </div>
         </div> */}
            {/* {isClick && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="ml-4 flex items-center space-x-4">
                <Link
                  href="./login"
                  className="block text-white hover:bg-white hover:text-black rounded-lg"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )} */}
          </div>
        </div>
      </nav>
    </>
  );
};
