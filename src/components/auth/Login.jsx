import { useState } from "react";
import {useLoginMutation} from '../../features/api/apiSlice'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/authSlice";

export default function Login(){
    const [login] = useLoginMutation();
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            setError(false)

            const user = {
                email: e.target.email.value, 
                password: e.target.password.value, 
            }
            const response = await login(user)
            if(response.error ){
                setError(response.error)
            }else{
                localStorage.setItem('sessionData', JSON.stringify(response.data))
                dispatch(loginSuccess(response.data))
                Swal.fire({
                    position: "top-center", 
                    icon: "success", 
                    title: "Bienvenido", 
                    showConfirmButton: false, 
                    timer: 1500
                })
                .then(() => {
                    navigate('/user')
                })
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <div style={{height: '90px'}}></div>
            <div className="max-w-md w-full mx-auto py-5 pt-6 pb-10 px-10 bg-white border border-slate-200 text-sm rounded-lg">
                {!error ? null: (
                    <div className="flex justify-center bg-slate-100 text-red-500 font-bold">
                        Datos invalidos
                    </div>
                )}
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
                        <input type="email" 
                            required 
                            name="email" 
                            placeholder="Email" 
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
                        <input type="password" 
                            required 
                            minLength="3"
                            name="password" 
                            placeholder="Password" 
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4">Iniciar Sesion</button>
                    </div>
                </form>
            </div>
            <div style={{height: '180px'}}></div>
        </>
    );
}