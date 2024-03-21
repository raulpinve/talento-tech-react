export default function Login(){

    return (
        <>
            <div style={{height: '90px'}}></div>
            <div className="max-w-md w-full mx-auto py-5 pt-6 pb-10 px-10 bg-white border border-slate-200 text-sm rounded-lg">
                <form action="">
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