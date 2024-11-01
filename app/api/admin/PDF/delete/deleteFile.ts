import { userData } from '@/app/api/auth/sessionData';
import { del, list } from '@vercel/blob';

export async function deleteFile() {
    const user = await userData();
    const { blobs } = await list();
    
    if(!user || !blobs) return;

    blobs.forEach((blob) => {
        if(blob.pathname.includes(user.id)){
            del(blob.url);
        };
    });
}