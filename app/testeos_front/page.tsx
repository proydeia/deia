'use client'
import { useState } from "react"
import ListaPacientes from "../prueba_de_props/page"
export default function Testeo() {

  const listaPacientes: Paciente[] = [
    {
      nombre: 'Juan',
      apellido: 'Pérez',
      dni: '12345678',
      email: 'juan.perez@example.com',
      sexo: 'masculino',
    },
    {
      nombre: 'María',
      apellido: 'González',
      dni: '87654321',
      email: 'maria.gonzalez@example.com',
      sexo: 'femenino',
    },
    {
      nombre: 'Carlos',
      apellido: 'Sánchez',
      dni: '23456789',
      email: 'carlos.sanchez@example.com',
      sexo: 'masculino',
    },
    {
      nombre: 'Lucía',
      apellido: 'Martínez',
      dni: '98765432',
      email: 'lucia.martinez@example.com',
      sexo: 'femenino',
    },
    {
      nombre: 'Alex',
      apellido: 'Rodríguez',
      dni: '34567890',
      email: 'alex.rodriguez@example.com',
      sexo: 'otro',
    }
  ]
    const [etapa, setEtapa] = useState()
    //averiguar como pasar las props de los inputs
    // sm:w-full sm:max-w-lg
    return (
        <div className="flex min-h-full flex-1 flex-row justify-center items-center  px-6 py-12 lg:px-8">
        <div className=" shadow-md rounded-lg p-6 sm:mx-auto min-w-full ">
        
      <ListaPacientes pacientes={listaPacientes} />
    
        </div>
      </div>
    
      
    )
}