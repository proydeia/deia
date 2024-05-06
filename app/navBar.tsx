import Link from "next/link";
const Navbar = () => {
    return(
        <div className="fixed top-0 left-0 h-screen w-20 m-0 flex flex-col bg-teal-200 shadow-lg">
            <Link href="/authorized">Autorizado</Link>
            <Link href="/login">Login</Link>
            <Link href="/">Home</Link>
            
        </div>
    );
}
export default Navbar