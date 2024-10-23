import { userData } from '@/app/api/auth/userData';
import { list } from '@vercel/blob';

export async function POST(): Promise<{file:any, aproved:boolean}> {
  const user = await userData();
  const { blobs } = await list();
  
  if(!user) return { file: null, aproved: false };
  if(!blobs) return { file: null, aproved: false };

  const blob = blobs.find((blob) => {
    if(blob.pathname.includes(`${user.id}.pdf`)) return blob;
  });

  if(!blob) return { file: null, aproved: false };

  return {
    file: blob, 
    aproved: blob.pathname.includes('aproved')
  };
}