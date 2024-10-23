import { del } from '@vercel/blob';

export async function POST(request: Request) {
    const url = request.url;
    return del(url);
}