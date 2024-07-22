"use client";
import AgregarPacientes from "../componenetes/agregar_p_form";
import { useState, useEffect } from "react";
import Navbar from "../navBar";

export default function Testeo() {
  const listaPacientes = [
    {
      nombre: "Juan",
      apellido: "Pérez",
      dni: "12345678",
      email: "juan.perez@example.com",
      sexo: "masculino",
    },
    {
      nombre: "María",
      apellido: "González",
      dni: "87654321",
      email: "maria.gonzalez@example.com",
      sexo: "femenino",
    },
    {
      nombre: "Carlos",
      apellido: "Sánchez",
      dni: "23456789",
      email: "carlos.sanchez@example.com",
      sexo: "masculino",
    },
    {
      nombre: "Lucía",
      apellido: "Martínez",
      dni: "98765432",
      email: "lucia.martinez@example.com",
      sexo: "femenino",
    },
    {
      nombre: "Alex",
      apellido: "Rodríguez",
      dni: "34567890",
      email: "alex.rodriguez@example.com",
      sexo: "otro",
    },
    {
      nombre: "Sofía",
      apellido: "López",
      dni: "45678901",
      email: "sofia.lopez@example.com",
      sexo: "femenino",
    },
    {
      nombre: "Pedro",
      apellido: "Gómez",
      dni: "56789012",
      email: "pedro.gomez@example.com",
      sexo: "masculino",
    },
    {
      nombre: "Ana",
      apellido: "Martín",
      dni: "67890123",
      email: "ana.martin@example.com",
      sexo: "femenino",
    },
    {
      nombre: "Luis",
      apellido: "Hernández",
      dni: "78901234",
      email: "luis.hernandez@example.com",
      sexo: "masculino",
    },
    {
      nombre: "Laura",
      apellido: "Fernández",
      dni: "89012345",
      email: "laura.fernandez@example.com",
      sexo: "femenino",
    },
    {
      nombre: "Miguel",
      apellido: "Ramírez",
      dni: "90123456",
      email: "miguel.ramirez@example.com",
      sexo: "masculino",
    },
    {
      nombre: "Elena",
      apellido: "Torres",
      dni: "01234567",
      email: "elena.torres@example.com",
      sexo: "femenino",
    },
    {
      nombre: "David",
      apellido: "Domínguez",
      dni: "12345001",
      email: "david.dominguez@example.com",
      sexo: "masculino",
    },
    {
      nombre: "Marta",
      apellido: "Ruiz",
      dni: "23456002",
      email: "marta.ruiz@example.com",
      sexo: "femenino",
    },
    {
      nombre: "Alberto",
      apellido: "Molina",
      dni: "34567003",
      email: "alberto.molina@example.com",
      sexo: "masculino",
    },
    {
      nombre: "Isabel",
      apellido: "Navarro",
      dni: "45678004",
      email: "isabel.navarro@example.com",
      sexo: "femenino",
    },
  ];

  interface Paciente {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    sexo: string;
  }

  function transformarListaEnObjeto(
    lista: Paciente[]
  ): Record<string, Paciente> {
    return lista.reduce((obj, paciente) => {
      obj[paciente.dni] = paciente;
      return obj;
    }, {} as Record<string, Paciente>);
  }

  const [formA, setFormA] = useState(0);
  console.log(formA);
  const pacientesObj = transformarListaEnObjeto(listaPacientes);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPacientes, setFilteredPacientes] = useState<Paciente[]>([]);
  const [Pagina, setPagina] = useState("1");


  useEffect(() => {
    setFilteredPacientes(
      Object.values(pacientesObj).filter(
        (paciente) =>
          paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paciente.apellido.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);



  const listaTest = filteredPacientes.map((paciente, index) => (
    <li key={index} className="bg-primary_light p-2 rounded mb-2 shadow-sm">
      {paciente.nombre} {paciente.apellido}
    </li>
  ));
console.log(Pagina)
  return (
    <>
      <Navbar />
      <main className="flex flex-row h-screen">
        {/* LISTA DE PACIENTES */}
        <div className="w-5/12 flex items-center justify-center bg-primary">
          <div className="w-10/12 flex flex-col gap-4 items-center">
            <p className="text-3xl font-bold text-left  w-full">
              Historial de Pacientes
            </p>
            <div className="w-full">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border rounded bg-primary_light static"
                />
              </div>
              <div className="h-96 overflow-y-auto">
                <ul>{listaTest}</ul>
              </div>
            </div>

            <div className="w-full flex justify-center ">
              <button
                onClick={() => setFormA(1)}
                className="mt-4 mx-6 bg-third text-white py-2 px-8 rounded"
              >
                Agregar pacientes
              </button>
            </div>
          </div>
        </div>
        {/* PREVISUALIZACION DE PACIENTES */}
        <div className="w-7/12 bg-secondary flex justify-center ">
          {formA === 1 && <AgregarPacientes />}
          <div className="h-full w-10/12 flex items-center justify-center flex-col ">
            <p className="font-bold text-left text-3xl w-full">
              Instrucciones
            </p>
            <div className="text-left ">Como usar nuestra página?</div>
          </div>
          <button onClick={() => setPagina("1")}>boton 1</button>
          <button onClick={() => setPagina("2")}>boton 2</button>
          <button onClick={() => setPagina("3")}>boton 3</button>
          <button onClick={() => setPagina("4")}>boton 4</button>
        </div>
      </main>
    </>
  );
}
