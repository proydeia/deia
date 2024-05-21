type Paciente = {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    sexo: 'masculino' | 'femenino' | 'otro';
};
type ListaPacientesProps = {
    pacientes: Paciente[]
}

const ListaPacientes: React.FC<ListaPacientesProps> = ({ pacientes }) => {
    return (
        <>
            <div>
                {pacientes.map((pacientes, index) => (
                    <table key={index} className="bg-primary shadow-md rounded-sm p-6 my-4 w-full ">
                        <tbody>
                            <tr className="text-lg font-bold">{pacientes.nombre} {pacientes.apellido}</tr>
                            <td>DNI: {pacientes.dni}</td>
                            <td>Email: {pacientes.email}</td>
                            <td>Sexo: {pacientes.sexo}</td>
                        </tbody>
                    </table>
                ))}
            </div>
        </>
    )
}
export default ListaPacientes;