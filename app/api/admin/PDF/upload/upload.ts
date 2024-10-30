//"use server";
// import fs from "node:fs/promises";
// import path from "node:path";
// import { revalidatePath } from "next/cache";
// import { userData } from "@/app/api/auth/userData";

// export async function uploadFile(formData: FormData) {
//   const user = await userData();
//   if (!user) return;
  
//   const file = formData.get("file") as File;

//   if (!file) {
//     return;
//   }

//   if (file.type !== "application/pdf") {
//     throw new Error("Only PDF files are allowed");
//   }

//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = new Uint8Array(arrayBuffer);

//   const directoryPath = path.resolve(process.cwd(), "pdf/submited");
//   const filePath = path.join(directoryPath, `${user.id}.pdf`);

//   await fs.mkdir(directoryPath, { recursive: true });
  
//   await fs.writeFile(filePath, buffer);
  
//   revalidatePath("/");
// }

// export async function deleteFile() {
//   const user = await userData();
//   if (!user) return;

//   const submited = path.resolve(process.cwd(), "pdf/submited",`${user.id}.pdf`);
//   const aproved = path.resolve(process.cwd(), "pdf/aproved",`${user.id}.pdf`);
  
//   try{
//       await fs.unlink(submited);
//     }
//     catch(error){
//         console.log('Error al eliminar archivo.', error)
//     }

//     try{
//       await fs.unlink(aproved);
//     }
//     catch(error){
//         console.log('Error al eliminar archivo.', error)
//     }
//     revalidatePath("/");
// }





import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function upload(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // ⚠️ The below code is for App Router Route Handlers only
  if (!request.body) {
    throw new Error("Request body is null");
  }
  
  const blob = await put(`/submited/${filename}`, request.body, { access: 'public'});

  // Here's the code for Pages API Routes:
  // const blob = await put(filename, request, {
  //   access: 'public',
  // });

  return NextResponse.json(blob);
}
