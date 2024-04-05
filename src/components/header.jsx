import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { useState } from "react";

export default function Header(){
    
    const isAutheticated = useSelector(state => state.auth.isAutheticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.auth.user)
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('sessionData')
        navigate('/login')
    }
    return (
        <nav className="py-4 border-b border-slate-200 bg-white  w-full text-sm  z-50">
            <div className="container flex justify-between items-center mx-auto">
                <ul className="flex space-x-5">
                    {!isAutheticated ? null : (
                        <>
                        <li><Link to='/' className="hover:text-orange-600">Inicio</Link></li>
                        <li><Link to='/create-house' className="hover:text-orange-600">Crear casas</Link></li>
                        <li><Link to='/house' className="hover:text-orange-600">Casas</Link></li>
                        <li><Link to='/user' className="hover:text-orange-600">Usuarios</Link></li>
                        <li><Link to='/chat' className="hover:text-orange-600">Chat</Link></li>
                        </>
                    )}
                    <li><Link to='/create-user' className="hover:text-orange-600">Crear Usuario</Link></li>
                </ul>
                {/* Dropdown usuario logueado */}
                <div className="relative flex rounded-full focus:outline-none focus:ring-2 px-5" >
                    {isAutheticated ?(
                        <>
                        <div className="relative">
                          <img
                            src={`http://localhost:3000/${user.avatar}`}
                            alt="Avatar"
                            className="rounded-full h-10 w-10 cursor-pointer"
                            onClick={toggleMenu}
                          />
                          {isOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                            <p className="block px-4 py-2 text-sm text-red-400">{user.name} {user.lastname}</p>
                            <Link to={`/user/${user._id}`} className="block  px-4 py-2 text-sm text-gray-400">
                                Profile
                            </Link>
                            <Link to={`/change-password`} className="block  px-4 py-2 text-sm text-gray-400">
                              Change password
                            </Link>
                            <a
                              onClick={handleLogout}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Logout
                            </a>
                          </div>
                          )} 
                        </div>
                      </>
                    ):(
                      <Link to='/login' className="hover:text-orange-600 cursor-pointer">Login</Link>
                    )}
                </div>
            </div>
        </nav>
        );
}