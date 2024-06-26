"use strict";
import { z } from 'zod'
 
export const spirometrieFormSchema = z.object({
    //data y tipo de dato, copiar de otro script
})
 
export type spirometrieState =
  | {
      errors?: {
        user?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined