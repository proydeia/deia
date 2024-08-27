"use client";
// import { logOut } from "@/app/actions/loginAuth";
export default function Logout() {

    const handler = async () => {
        // logOut();
    }
    return (
        <>
            <form action={handler}>
                <button type="submit" className="bg-secondary px-8  py-1  h-full rounded-lg hover:bg-primary">
                    <p>Sign Out</p>
                </button>
            </form>
        </>
    )
}