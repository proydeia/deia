"use server"
import { userData } from "@/app/api/auth/userData";
import { medicFormSchema, medicState } from "@/app/lib/formsDefinitions/medicFormDefinition";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

// Pacientes

export async function getMedicList(): Promise < User[] > {
    
    const user = await userData();
    if (!user || !user.adm) throw new Error('U');
 
    try{    
        return await prisma.user.findMany({
            where: {
                adm: false,
                organization: user.organization
            }
        });
        }
    catch(error:unknown){
        console.log(error);
        throw new Error('D');
    }
}

export async function getMedic(email:string): Promise < User | null> {
 
    const user = await userData();
    if (!user || !user.adm) throw new Error('U');
    try{
        return await prisma.user.findUnique({
            where: {
                email: email
            },
        });
    }
    catch(error:unknown){
        throw new Error('D');
    }
}

export async function deleteUser(email: string) {
 
    const user = await userData();
    if (!user || !user.adm) throw new Error('U');
    try{
        await prisma.user.delete({
            where: {
                email: email
            }
        })
        return {
            message:'Usuario eliminado con éxito.'
        }
    }
    catch(error:unknown){
        return {
            message:'Error al eliminar registro.'
        }
    }
}

export async function createMedic(state:medicState, formData:FormData) {
    const validatedFields = medicFormSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
    };
 
    const user = await userData();
    if (!user || !user.adm) throw new Error('U');

    try{
        const medic = await getMedic(validatedFields.data.email);

        if(medic){
            return {
                message:'El usuario ya existe.'
            };
        }

        const newUser = await prisma.user.create({
            data:{
                ...validatedFields.data,
                adm: false,
                organization: user.organization,
            },
            select:{
                email:true,
            }
        });
        
        return {
            message:'Registro creado con éxito.',
            user: newUser
        };
    }
    catch(error: unknown){
        return {
            message:'Error al crear registro. Intente denuvo más tarde.'
          };
    }
}
