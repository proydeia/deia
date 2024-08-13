"use strict";
import { z } from 'zod'
 
export const spirometryFormSchema = z.object({
    id: z
    .string()
    .trim(),

    sexo: z
    .number(),

    altura: z
    .number(),

    peso: z
    .number(),

    nacimiento: z
    .date(),

    fev1: z
    .number({message:'Ingresar un valor válido'})
    //.max(100, {message:'Ingresar un valor válido'})
    .min(0, {message:'Ingresar un valor válido'}),

    fev1_lln: z
    .number({message:'Ingresar un valor válido'})
    //.max(100, {message:'Ingresar un valor válido'})
    .min(0, {message:'Ingresar un valor válido'}),

    fvc: z
    .number({message:'Ingresar un valor válido'})
    //.max(100, {message:'Ingresar un valor válido'})
    .min(0, {message:'Ingresar un valor válido'}),
    
    fvc_lln: z
    .number({message:'Ingresar un valor válido'})
    //.max(100, {message:'Ingresar un valor válido'})
    .min(0, {message:'Ingresar un valor válido'}),

  })
 
export type spirometrieState =
  | {
      errors?: {
        id?:        string[]
        // sexo?:      string[]
        // altura?:    string[]
        // peso?:      string[]
        // nacimiento: string[]
        fev1?:      string[]
        fev1_lln?:  string[]
        fvc?:       string[]
        fvc_lln?:   string[]
      }
      message?: string
    }
  | undefined