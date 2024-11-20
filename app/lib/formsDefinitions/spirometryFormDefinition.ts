"use strict";
import { z } from 'zod'
 
export const spirometryFormSchema = z.object({
    id: z
    .number(),

    sexo: z
    .number(),

    altura: z
    .number(),

    nacimiento: z
    .date(),

    fev1: z
    .number({message:'Ingresar un valor válido'})
    .refine(data => data > 0, {message:'Ingresar un valor mayor a 0'}),

    fvc: z
    .number({message:'Ingresar un valor válido'})
    .refine(data => data > 0, {message:'Ingresar un valor mayor a 0'}),
  })
 
export type spirometryState =
  | {
      errors?: {
        id?:        string[]
        sexo?:      string[]
        altura?:    string[]
        nacimiento?:string[]
        fev1?:      string[]
        fvc?:       string[]
      }
      message?: string
    }
  | undefined