import { auth } from "@/auth";
import { Session } from "next-auth";


export const getSession = async (): Promise <Session | null> => { //devuelve la session del usuario, si existe.\
    const session = await auth();
    return session as Session;
}

export const isAdmin = async (): Promise <boolean | null | undefined > => { //devuelve si el usuario es admin o no, si está en sessión.
    const session = await getSession();
    return session?.user?.admin;
}

export const userId = async (): Promise <string | null> => { //devuelve el id del usuario, si está en sessión. 
    const session = await getSession();
    const id = session?.user?.id;
    return id || null;
}

export async function checkMedic() {
    const id: string | null = await userId();
    if(!id || await isAdmin()) throw new Error('U');
    return id
} 