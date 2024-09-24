import { signOut } from "@/auth"
import { redirect } from "next/navigation";
export default function Logout() {
    return (
        <>
            <form action={async() =>{"use server"; await signOut(redirect('./'))}}>
                <button type="submit" className="bg-secondary px-8  py-1  h-full rounded-lg hover:bg-primary">
                    <p>Sign Out</p>
                </button>
            </form>
        </>
    )
}