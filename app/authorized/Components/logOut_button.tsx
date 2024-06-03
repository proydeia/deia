import { signOut } from "@/auth";
export default function Logout(){
    
    const handler = async() => {
        "use server"
        await signOut({redirect: true, redirectTo: '/'});
    }
    return(
        <>
            <form action={handler}>
                    <button type="submit" className="bg-teal-500 p-4 rounded-lg hover:bg-teal-600">Sign Out</button>
            </form>
        </>
    )
}