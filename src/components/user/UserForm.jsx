export default function UserForm({props}){

    const { handleSubmit, user, handleChangeAvatar } = props

    return (
        <>
            <div style={{height: '90px'}}></div>
            <div className="max-w-md w-full mx-auto px-5 py-5 rounded-lg bg-white border border-slate-200 text-sm">

                <form onSubmit={handleSubmit} className="p-6 pb-10 mb-4" autoComplete="off">
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Nombres</label>
                        <input 
                            type="text" 
                            required 
                            name="name" 
                            placeholder="Ej: Raúl"
                            defaultValue={user?.name}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Apellidos</label>
                        <input 
                            type="text" 
                            required 
                            name="lastname" 
                            placeholder="" 
                            defaultValue={user?.lastname}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Email</label>
                        <input 
                            required 
                            type="email" 
                            name="email" 
                            defaultValue={user?.email}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Identificación</label>
                        <input 
                            required
                            type="number"
                            name="id" 
                            defaultValue={user?.id}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        />
                    </div>

                    {user ? null :
                        (<div className="mb-4">
                            <label className="block text-gray-600 font-semibold mb-2">Contraseña</label>
                            <input 
                                required 
                                type="password" 
                                name="password" 
                                className= "appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                            />
                        </div>)}

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="file" onChange={handleChangeAvatar} name="file" accept="image/png, image/jpeg" type="file" className="hidden" />
                        </label>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4">Guardar</button>
                    </div>
                </form>
            </div>
            <div style={{height: '180px'}}></div>
        </>
       
    );
}