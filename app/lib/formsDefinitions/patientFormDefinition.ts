"use strict";
import { z } from 'zod'
 
export const patientFormSchema = z.object({
  name: z
  .string({ message: 'Ingresar un valor de texto.'})
  .min(1, {message: 'Ingresar un nombre'})
  .max(50, {message:'Ingresar un texto no mayor a 100 caracteres'})
  .trim(),

  nacimiento: z
  .date({message:'Ingresar una fecha válida'}),

  extrainfo: z
  .string({message:'Ingresar un valor de texto'})
  .max(3000, {message:'Ingresar un texto no mayor a 3000 carateres'})
  .optional()
  .nullable(),

  peso: z
  .number({message:'Ingresar un valor numerico'})
  .min(1, {message:'Ingresar una valor válida'}),

  altura: z
  .number({message:'Ingresar un valor numerico'})
  .min(1, {message:'Ingresar una valor válida'}),

  sexo: z
  .number({message:'Ingresar un valor numerico'})
  .min(-1, {message:'Ingresar un valor válido'})
  .max(1, {message:'Ingresar un valor válido'})
})
 
export type patientState =
| {
    errors?: {
      name?: string[]
      nacimiento?: string[]
      extraInfo?: string[]
      peso?: string[] 
      altura?: string[]
      sexo?: string[]
    }
    message?: string
  }
| undefined