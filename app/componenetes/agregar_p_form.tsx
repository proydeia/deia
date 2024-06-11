'use client'
import FormButton from "./form_button";
import { useState } from "react";

export default function AgregarPacientes() {

  const [name, setName] = useState()
  const [extra, setExtra] = useState()

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <p className="text-3xl font-bold text-left w-full">Form</p>
      <div className="w-10/12 bg-primary_light h-3/4 rounded-sm flex flex-col justify-center items-center gap-4">
        <label>
          <h1 className="text-sm font-light text-third">Nombre y Apellido</h1>
          <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Ingrese Nombre y Apellido" 
          className="px-3 rounded-md py-2"
          />
        </label>
        <label>
          <h1 className="text-sm font-light text-third">Información Extra</h1>
          <input 
          type="text" 
          id="extra" 
          value={extra} 
          onChange={(e) => setExtra(e.target.value)} 
          placeholder="Ingrese Informacion Extra"
          className="px-3 rounded-md py-2"
          />
        </label>
        <label className="flex flex-col gap-2">
          <h1 className="text-sm font-light text-third">Valores Espirometría</h1>
          <input 
          className="px-3 rounded-md py-2"
          placeholder="Valor 1"></input>
          <input 
          className="px-3 rounded-md py-2"
          placeholder="Valor 2"></input>
        </label>
        <FormButton />
      </div>
    </div>
  );
}
