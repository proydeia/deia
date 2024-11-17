import { ok } from 'assert';
import { createPatient } from '../patient';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
    const data = await req.json();

    if (!data) { return NextResponse.json({status: 400}) }

    try {
      const result = await createPatient(data);
      return NextResponse.json({...result, status: 200});
    } 
    
    catch (error) {
      console.error(error);
      return NextResponse.json({status: 500, ok: false});
    }
}