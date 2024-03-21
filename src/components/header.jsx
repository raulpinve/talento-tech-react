import { Link } from "react-router-dom";

export default function Header(){

    return (
        <nav className="py-4 border-b border-slate-200 bg-white fixed top-0 w-full text-sm  z-50">
            <div className="container flex justify-between items-center mx-auto">
                <ul className="flex space-x-5">
                    <li><Link to='/' className="hover:text-orange-600">Inicio</Link></li>
                    <li><Link to='/user' className="hover:text-orange-600">Usuarios</Link></li>
                    <li><Link to='/create-user' className="hover:text-orange-600">Crear Usuario</Link></li>
                </ul>
                <div className="relative flex rounded-full focus:outline-none focus:ring-2 px-5" >
                    <Link to='/login' className="hover:text-orange-600">Login</Link>
                </div>
            </div>
        </nav>
        );
}