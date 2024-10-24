import { userData } from '#/auth/userData';
import { del, list } from '@vercel/blob';

export async function POST(request: Request) {
    const user = await userData();
    const { blobs } = await list();
    return Response.json(blobs)
}       