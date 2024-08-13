"use strict";
import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  user: z
    .string({ message: 'Por favor ingresar un valor de texto.'})
    .min(1, { message: 'Por favor ingresar un usuario.' })
    .max(50, { message: 'Ingresar valor de no mas de 50 Caracteres.' })
    .trim(),

  password: z
    .string({ message: 'Por favor ingresar un valor de texto.'})
    .min(1, { message: 'Por favor ingresar una contraseña.' })
    .max(100, { message: 'Ingresar valor de no mas de 100 caracteres.' })
    .trim(),
})
 
export type LoginState =
| {
    errors?: {
      user?: string[]
      password?: string[]
    }
    message?: string
  }
| undefined