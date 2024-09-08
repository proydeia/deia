import { auth } from "@/auth";

export async function userData(): Promise<{id: string, adm:boolean, organization:string} | false> {
    const session = await auth();
    if (session?.user?.adm !== null && session?.user?.id && session?.user?.organization) {
        return {id: session.user.id, adm: session.user.adm, organization: session.user.organization};
    }
    return false;
}