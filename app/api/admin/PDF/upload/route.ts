import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { userData } from '#/auth/userData';

export async function POST(request: Request): Promise<NextResponse> {
      const user = await userData()
      if (!request.body || !user) {
            throw new Error("Request body is null");
      }
      try {
            const blob = await put(`/submited/${user.id}.pdf`, request.body, { 
                  access: 'public',
                  token: process.env.BLOB_READ_WRITE_TOKEN,
                  contentType: 'application/pdf'
            });
            return NextResponse.json({message: 'Archivo subido correctamente.'});
      }
      catch(error){
            console.log('Error al subir archivo.', error)
            return NextResponse.json(error);
  }
}