import { userData } from '@/app/api/auth/sessionData';
import { del, list } from '@vercel/blob';

export async function POST(request: Request) {
    const user = await userData();
    const { blobs } = await list();
    return Response.json(blobs)
}       