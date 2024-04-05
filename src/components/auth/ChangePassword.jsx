import { useState } from "react"
import { useLoginMutation, useUpdateUserMutation } from "../../features/api/apiSlice"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"

export default function ChangePassword() {

    const [newPassword, setNewPassword] = useState("")
    const [notEqualPassword, setNotEqualPassword] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
    }
    const handleChangeRepeatNewPassword = (e) => {
        setNotEqualPassword(!(newPassword === e.target.value))
    }
    
    const user = useSelector((state) => state.auth.user)
    const [login] = useLoginMutation()
    const [updateUser] = useUpdateUserMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError(false)

        const userValidate = {
            email: user.email, 
            password: e.target.password.value,
        }

        const response = await login(userValidate)
        if(response.error && response.error.data.status === "error"){
            setIsError(true)
        }else{
            if(!notEqualPassword){
                const newUser = {
                    _id: user._id, 
                    password: e.target["new-pasword"].value
                }
                const response = await updateUser(newUser)
                if(response.data.status == "error"){
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Error actualizando la contraseña",
                        showConfirmButton: false,
                        timer: 1500
                      })
                }else{ 
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "contraseña actualizada correctamente",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        }
    }

    return (
        <>
            <div style={{height: '90px'}}></div>
            <div className="max-w-md w-full mx-auto py-5 pt-6 pb-10 px-10 bg-white border border-slate-200 text-sm rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Current password</label>
                        <input type="password" 
                            required 
                            minLength="3"
                            name="password" 
                            id="password"
                            placeholder="Password" 
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="new-password">New password</label>
                        <input type="password" 
                            required 
                            minLength="3"
                            id= "new-password"
                            name="new-password" 
                            placeholder="New password" 
                            onChange={handleChangeNewPassword}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Repeat new password</label>
                        <input type="password" 
                            required 
                            minLength="3"
                            id="repeat-new-password"
                            name="repeat-new-password" 
                            placeholder="Repeat new password" 
                            onChange={handleChangeRepeatNewPassword}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5"
                        />
                        { notEqualPassword ? 
                            <span className="text-red-600">Las contraseñas no coinciden</span>
                            : null
                        }
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4">Change password</button>
                    </div>
                </form>
            </div>
            <div style={{height: '180px'}}></div>
        </>
    );
}