import { auth } from "@/auth"
import { Session } from "next-auth"

export const getSession = async () => {

    const session = await auth();
    
    if(!session) return null;

    return{
        id: session.user?.id,
        name: session.user?.name,
        email: session.user?.email,
    };

}