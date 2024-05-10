"use strict";
import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  user: z
    .string({ message: 'Por Favor Ingresar un Valor de Texto.'})
    .min(1, { message: 'Por Favor Ingresar un Usuario.' })
    .max(50, { message: 'Ingresar Valor de no mas de 50 Caracteres.' })
    .trim(),
  password: z
    .string({ message: 'Por Favor Ingresar un Valor de Texto.'})
    .min(1, { message: 'Por Favor Ingresar una Contraseña.' })
    .max(100, { message: 'Ingresar Valor de no mas de 100 Caracteres.' })
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