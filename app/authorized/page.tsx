import NavbarA from "./Components/NavBar";
import Previsualizacion from "./Components/previsualisacion";
import { getUserList } from "../lib/db/schema";
import { GetServerSideProps } from "next";

interface User {
    id: string;
    name: string;
}

interface AuthorizedPageProps {
    userList: User[];
}

const AuthorizedPage: React.FC<AuthorizedPageProps> = ({ userList }) => {
    return (
        <>
            <NavbarA />
            <main className="h-screen">
                <div className="relative grid grid-cols-12 gap-4 h-full">
                    <div className="col-start-1 col-end-4 md:col-span-2 h-full">
                        <Previsualizacion />
                    </div>
                    <div className="bg-primary col-start-3 col-end-13 p-4 overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Lista de Pacientes</h2>
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{user.id}</td>
                                        <td className="py-2 px-4 border-b">{user.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const userList = await getUserList();
    return { props: { userList } };
}

export default AuthorizedPage;
