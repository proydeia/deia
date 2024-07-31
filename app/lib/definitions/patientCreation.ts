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
  .min(0, {message:'Ingresar una fecha válida'}),

  altura: z
  .number({message:'Ingresar un valor numerico'})
  .min(0, {message:'Ingresar una fecha válida'}),

  sexo: z
  .number({message:'Elegir una de las opciones'})
  .min(0, {message:'Elegir una de las opciones'})
  .max(1, {message:'Elegir una de las opciones'}),
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