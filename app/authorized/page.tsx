import { auth } from "@/auth";
import Logout from "./logOut_button";
import { getUserList } from "../lib/db/schema";
export default async function AuthorizedPage() {
    console.log(await auth())
    const users = await getUserList();

    return(
        <>
        <main>
            <div>
                <h1>Authorized page</h1>
                <h2>{JSON.stringify(users)}</h2>
                <Logout/>
            </div>
        </main>
        </>
    );
}