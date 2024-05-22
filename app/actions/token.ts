import { auth } from "@/auth"
import { Session, User } from "next-auth"

const getSession = async (): Promise<Session | null> => {

    const session = await auth();
    if(!session) return null;

    return session as Session;

}

const isAdmin = async (): Promise<boolean | null> => {
    const session = await getSession();
    const adm:boolean = session?.user?.admin as boolean;
    
    return adm  || null;
}

const userId = async (): Promise<string | null> => {    
    const session = await getSession();
    const id:string = session?.user?.id as string;

    return id || null;
}

export {     // Si el usuario esta logeado; sino devuelve 'undefined'.
    isAdmin, //-->  Devuelve el valor de session.user.admin (true | false).
    userId,  //-->  Devueve el valor de session.user.id (string).
};