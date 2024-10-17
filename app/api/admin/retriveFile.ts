"use server";
import fs from "node:fs/promises";
import path from "node:path";
import { userData } from "@/app/api/auth/userData";

export async function submitedFile() {
    const user = await userData();
    if (!user) return null;

    const filePath = path.resolve(process.cwd(), 'pdf/submited', `${user.id}.pdf`);
    
    try {
        const fileContent = await fs.readFile(filePath);
        return fileContent;
      } 
    catch (error) {
        return null;
    }
  }

export async function aprovedFile() {
    const user = await userData();
    if (!user) return null;

    const filePath = path.resolve(process.cwd(), 'pdf/aproved', `${user.id}.pdf`);
    
    try {
        const fileContent = await fs.readFile(filePath);
        return fileContent;
      } 
    catch (error) {
        return null;
    }
  }