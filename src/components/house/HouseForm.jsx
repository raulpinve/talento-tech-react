import { useEffect, useState } from "react";
import { useGetDepartmentsQuery, useLazyGetCitiesByDepartmentQuery } from "../../features/api/apiColombiaSlice";

export default function HouseForm({props}){
    
    const { handleSubmit, house, handleChangeImage } = props
    const { data: departments, isLoading, isError, error} = useGetDepartmentsQuery()
    const [ selectedDepartment, setSelectedDepartment ] = useState("")
    const [ cities, setCities ] = useState([])
    const [selectedCity, setSelectedCity] = useState("");

    const [getCities] = useLazyGetCitiesByDepartmentQuery();

    const handleChangeDepartment = async (value) => {
        setCities([])
        setSelectedDepartment(value)
        if(value){
            const response = await getCities(value.split("-")[0])        
            setCities(response.data)
        }
    }
    // Obtener el ID del departamento seleccionado
    useEffect(() => {
        if (!isLoading && !isError && departments && house && house.state && house.city) {
            const department = departments.find(department => department.name === house.state);
            if (department) {
                setSelectedDepartment(`${department.id}-${department.name}`);
                handleChangeDepartment(`${department.id}-${department.name}`)
            }
        }
    }, [departments, house, isLoading, isError]);
    
    useEffect(() => {
        setSelectedCity(house.city)
    }, [cities, house])

    if (isLoading) return <div role="status" className='flex justify-center'>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>;
    else if(isError) return (<div>Error: {error.message} </div>)

    return (
        <>
            <div className="max-w-md mt-6 w-full mx-auto px-5 py-5 rounded-lg bg-white border border-slate-200 text-sm">

                <form onSubmit={handleSubmit} className="p-6 pb-10 mb-4" autoComplete="off">
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Código</label>
                        <input 
                            type="text" 
                            required 
                            name="code" 
                            placeholder="Ej: ABCD1234"
                            defaultValue={house?.code}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Dirección</label>
                        <input 
                            type="text" 
                            required 
                            name="address" 
                            placeholder="" 
                            defaultValue={house?.address}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Departamento</label>
                        <select 
                            name="state" 
                            required 
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                            onChange={(e) => handleChangeDepartment(e.target.value)}   
                            value={selectedDepartment}                         
                        >
                            <option value="">Seleccione un departamento</option>
                            {departments.map(department => (
                                <option key={department.id} value={`${department.id}-${department.name}`} >{department.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Ciudad</label>
                        <select 
                            name="city" 
                            required
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}  // Agregar onChange para manejar los cambios
                        >
                            <option value="">Seleccione la ciudad</option>
                            {cities.map(city => (
                                <option key={city.id} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Tamaño</label>
                        <input 
                            required
                            type="number"
                            name="size" 
                            min= "1"
                            defaultValue={house?.size}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Tipo</label>
                        <input 
                            required
                            type="text"
                            name="type" 
                            defaultValue={house?.type}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Código postal</label>
                        <input 
                            required
                            type="text"
                            name="zip_code" 
                            defaultValue={house?.zip_code}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Número de habitaciones</label>
                        <input 
                            required
                            type="number"
                            name="rooms" 
                            min="1"
                            defaultValue={house?.rooms}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Número de baños</label>
                        <input 
                            required
                            type="number"
                            name="bathrooms" 
                            min="1"
                            defaultValue={house?.bathrooms}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Parqueadero</label>
                        <select 
                            name="parking" 
                            defaultValue={house?.parking} 
                            id=""
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Precio</label>
                        <input 
                            required
                            type="number"
                            name="price" 
                            min="1"
                            defaultValue={house?.price}
                            className="appearance-none border rounded w-full focus:shadow-outline px-4 font-sm py-1.5" 
                        />
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="file" onChange={handleChangeImage} name="file" accept="image/png, image/jpeg" type="file" className="hidden" />
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