import { signOut } from "@/auth";
export default function Logout(){
    
    const handler = async() => {
        "use server"
        console.log('signing out');
        await signOut({redirect: true, redirectTo: '/'});
    }
    return(
        <>
            <form action={handler}>
                    <button type="submit">Sign Out</button>
            </form>
        </>
    )
}