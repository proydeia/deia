import { auth } from "@/auth";

export async function userData(): Promise<{id: string, adm:boolean} | false> {
    const session = await auth();
    if (session && session.user.adm !== null && session.user.id) {
        return {id: session.user.id, adm: session.user.adm};
    }
    return false;
}