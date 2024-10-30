"use server"
import { uuid } from "@/app/api/ID";
import { userData } from "@/app/api/auth/userData";
import db, { Medic } from "@/app/lib/dbSchema/schema";
import { medicFormSchema, medicState } from "@/app/lib/formsDefinitions/medicFormDefinition";

// Pacientes

export async function getMedicList(): Promise < Medic[] > {
    
    const user = await userData();
    if (!user || !user.adm) throw new Error('U');
 
    try{    
        return await db
        .selectFrom("users")
        .where("adm", "=", false)
        .where("organization", "=", user.organization)
        .selectAll()
        .execute();        
    }
    catch(error:unknown){
        throw new Error('D');
    }
}

export async function getMedic(medicId:string): Promise < Medic > {
 
    const user = await userData();
    if (!user || !user.adm) throw new Error('U');
    try{
        return await db
        .selectFrom("users")
        .where("adm", "=", false)
        .where("organization", "=", user.organization)
        .where("users.id", "=", medicId)
        .selectAll()
        .executeTakeFirstOrThrow();
    }
    catch(error:unknown){
        throw new Error('D');
    }
}

export async function deleteUser(userId: string) {
 
    const user = await userData();
    if (!user || !user.adm) throw new Error('U');
    try{
        await db.connection().execute(async (trx) => {
            await trx
                .deleteFrom('spirometries')
                .where('spirometries.patient', 'in', 
                    trx.selectFrom('patients')
                      .select('patients.id')
                      .where('patients.medic', '=', userId)
                )
                .executeTakeFirstOrThrow();

            await trx
                .deleteFrom('patients')
                .where('patients.medic', '=', userId)
                .executeTakeFirstOrThrow();

            await trx
                .deleteFrom('users')
                .where('users.id', '=', userId)
                .executeTakeFirstOrThrow();
        });
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
        if(await db.selectFrom("users").where("name", "=", validatedFields.data.email).where("organization", "=", user.organization).executeTakeFirst()){
            return {
                message:'El usuario ya existe.'
            };
        }

        const uniqueId = await uuid("patients")
     
        const newUser = await db
        .insertInto("users")
        .values({
            id: uniqueId,
            name: validatedFields.data.email,
            password: validatedFields.data.password,
            organization: user.organization,
            adm: false,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
        
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
