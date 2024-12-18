"use server"
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { LoginState, SignupFormSchema } from '@/app/lib/formsDefinitions/loginFormDefinition';
 
export async function authenticate(state: LoginState,  formData: FormData) { //credentials
  try {
    const validatedFields = SignupFormSchema.safeParse({
      user: formData.get('user'),
      password: formData.get('password'),
    });
    
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    };
    
    await signIn('credentials', formData);
  } 

  catch (error: unknown){    
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
    throw error;
  }
}