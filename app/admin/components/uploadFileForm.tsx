'use client';
 
import { type PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
 
export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <h1>Upload Your PDF</h1>
 
      <form
        onSubmit={async (event) => {
          event.preventDefault();
 
          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }
 
          const file = inputFileRef.current.files[0];

          const response = await fetch(`/api/admin/PDF/upload`,
            {
              method: 'POST',
              body: file,
            },
          );
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit" className='px-4 py-2 bg-secondary text-primary_light block rounded-lg mt-2'>Enviar</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}