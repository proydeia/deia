import NavbarA from "./Components/NavBar";
import { auth } from "@/auth";
import Logout from "./logOut_button";

export default async function AuthorizedPage() {
    console.log(await auth());

    return(
        <>
        <NavbarA/>
        <main>
            <div className="flex justify-center">
                <h1>Authorized page</h1>
                {/* <Logout/> */}
            </div>
        </main>
        </>
    );
}