import { userData } from '#/auth/userData';
import { del, list } from '@vercel/blob';

export async function POST(request: Request) {
        const user = await userData();
        const { blobs } = await list();
        
        if(!user || !blobs) return;
    
        blobs.forEach((blob) => {
            if(blob.pathname.includes(user.id)){
                del(blob.url);
            };
        });
}       