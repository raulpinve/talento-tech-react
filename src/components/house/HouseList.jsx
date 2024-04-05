import { Link } from 'react-router-dom';
import { useDeleteHouseMutation, useGetHousesQuery } from '../../features/api/apiHousesSlice';

import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

import Swal from 'sweetalert2';

export default function UserList(){

    /** Obtiene el estado de una variable con Redux */
    // const users = useSelector(state => state.users)
    const { data: houses, isLoading, isError, error } = useGetHousesQuery();
    const [ deleteUser ] = useDeleteHouseMutation()

    const handleDelete = house => {
        Swal.fire({
            title: `¿Estas seguro que deseas eliminar la casa: ${house.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
          })
        .then((result) => {
            if (result.isConfirmed) {
                deleteUser(house._id)              
            }
        });
    }
    
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
            <div className="xl:container mx-auto mt-6 flex justify-center p-10 bg-white rounded-lg border border-slate-200">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="font-semibold text-sm rounded">
                            <th className="px-4 py-2">Código</th>
                            <th className="px-4 py-2">Dirección</th>
                            <th className="px-4 py-2">Departamento</th>
                            <th className="px-4 py-2">City</th>
                            <th className="px-4 py-2">Tamaño</th>
                            <th className="px-4 py-2">Tipo</th>
                            <th className="px-4 py-2">Código postal</th>
                            <th className="px-4 py-2">Habs</th>
                            <th className="px-4 py-2">Baños</th>
                            <th className="px-4 py-2">Parqueaderos</th>
                            <th className="px-4 py-2">Precio</th>
                            <th className="px-4 py-2">Image</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm text-center'>
                        {houses.map(house => (
                            <tr key={house._id}>
                                <td className="border-y px-4 py-2 border-slate-200">{house.code}</td>
                                <td className="border-y px-4 py-2 border-slate-200">{house.address}</td>
                                <td className="border-y px-4 py-2 border-slate-200">{house.state}</td>
                                <td className="border-y px-4 py-2 border-slate-200">{house.city}</td>
                                <td className="border-y px-4 py-2 border-slate-200">{house.size}</td>
                                <td className="border-y px-4 py-2 border-slate-200">{house.type}</td>
                                <td className="border-y px-4 py-2 border-slate-200">{house.zip_code}</td>
                                <td className="border-y px-4 py-2 border-slate-200">{house.rooms}</td>
                                <td className="border-y px-4 py-2 border-slate-200">{house.bathrooms}</td>
                                <td className="border-y px-4 py-2 border-slate-200">{house.parking === true ? "Si" : "No"}</td>
                                <td className="border-y px-4 py-2 border-slate-200">{house.price}</td>
                                
                                <td className="border-y px-4 py-2 border-slate-200">
                                    <img 
                                        className="size-10 transition-transform duration-1000 transform hover:scale-110 max-w-none mx-auto"
                                        src={`http://localhost:3000/${house.image}`}
                                    />
                                </td>
                                <td className="border-y px-4 py-2 border-slate-200">
                                    <div className="inline-flex rounded-md shadow-sm" role="group">
                                        <Link to={`/house/${house._id}`}> 
                                            <RiEdit2Line className='size-4' />
                                        </Link>
                                        
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                handleDelete(house)
                                            }}
                                        >
                                            <MdDeleteOutline className='size-4'/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{height: '180px'}}></div>
        </>
        
    );
}