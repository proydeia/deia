import NavbarA from "./Components/NavBar";
import { auth } from "@/auth";
import Logout from "./logOut_button";
import { getUserList } from "../lib/db/schema";
export default async function AuthorizedPage() {
    console.log(await auth())
    const users = await getUserList();

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