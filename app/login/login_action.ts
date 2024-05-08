"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginState, SignupFormSchema } from "./definition";

export async function authenticate(state: LoginState, formData: FormData) {
    try{
        
        const validatedCredential = SignupFormSchema.safeParse({
            user: formData.get('user'),
            password: formData.get('password')
        });

        if(!validatedCredential.success) {
            return {
                errors: validatedCredential.error.flatten().fieldErrors,
            }
        };

        await signIn('credentials', validatedCredential.data);
    }

    catch(error) 
    {
        if (error instanceof AuthError) {
            switch (error.type) {
              case 'CredentialsSignin':
                return {
                  message:'Usuario o Contraseña incorrectos.'
                };
              default:
                return {
                  message:'Error interno. Intente nuevamente.'
              };
            }
          }
    }
}
