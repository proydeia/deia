"use strict";
import { z } from 'zod'
 
export const medicFormSchema = z.object({
    email: z.string({message:'Ingrese un valor valido'}).email({message:'Ingrese un mail'}),
    password: z.string({message:'Ingrese un valor valido'}).min(6, {message:'La contraseña debe tener al menos 6 caracteres'}),
})
 
export type medicState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined