import { userData } from '@/app/api/auth/userData';
import { list } from '@vercel/blob';

export async function GET(request: Request) {
  const user = await userData();
  const { blobs } = await list({ prefix: 'pdf' });
  
  if(!user) return Response.redirect('/login');
  if(!blobs) return;

  const blob = blobs.find((blob) => {
    if(blob.pathname.includes(`${user.id}.pdf`)) return blob;
  });

  if(!blob) return { file: null, aproved: false };

  return Response.json({
    file: blob, 
    aproved: blob.pathname.includes('aproved')
  });
}