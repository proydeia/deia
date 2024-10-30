import { auth } from "@/auth";

export async function userData(): Promise<{id: string, adm: boolean, organization: string} | false> {
    const session = await auth();
    const user = session?.user;

    if (user) {
        const { id, adm, organization } = user;
        return { id, adm, organization };
    }

    return false;
}