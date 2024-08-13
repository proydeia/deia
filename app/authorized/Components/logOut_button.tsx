"use client";
// import { logOut } from "@/app/actions/loginAuth";
export default function Logout(){
    
    const handler = async() => {
        // logOut();
    }
    return(
        <>
            <form action={handler}>
                    <button type="submit" className="bg-teal-500 p-4 rounded-lg hover:bg-teal-600">Sign Out</button>
            </form>
        </>
    )
}