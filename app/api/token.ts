import { auth } from "@/auth";
import { Session, User } from "next-auth";


export const getSession = async (): Promise <Session | null> => { //devuelve la session del usuario, si existe.
    const session = await auth();
    if(!session) return null;
    return session as Session;
}

export const isAdmin = async (): Promise <boolean | null> => { //devuelve si el usuario es admin o no, si está en sessión.
    const session = await getSession();
    const adm:boolean = session?.user?.admin as boolean;
    return adm || null;
}

export const userId = async (): Promise <string | null> => { //devuelve el id del usuario, si está en sessión. 
    const session = await getSession();
    const id:string = session?.user?.id as string;
    return id || null;
}

export async function checkMedic() {
    const id: string | null = await userId();
    if(!id || await isAdmin()) throw new Error('U');
    return id
} 