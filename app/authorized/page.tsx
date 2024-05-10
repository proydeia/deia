import NavbarA from "./Components/NavBar";
import Logout from "./logOut_button";
export default async function AuthorizedPage() {

    return(
        <>
        <NavbarA/>
        <main>
            <div className="flex justify-center">
                <h1>Authorized page</h1>
                <Logout/>
            </div>
        </main>
        </>
    );
}