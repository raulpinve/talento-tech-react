import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiHousesSlice = createApi({
    reducerPath: "housesApi", 
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }), 
    endpoints: (builder) => ({
        getHouses: builder.query({
            query: () => '/house',
            providesTags: ['Houses'], // Me permite ejecutar un llamado
            transformResponse: response => response.sort((a, b) => 
             (a.code[0].toUpperCase() < b.code[0].toUpperCase()) ? -1 
            : (a.code[0].toUpperCase() > b.code[0].toUpperCase())  ? 1 : 0)
        }),
        getHouseById: builder.query({
            query: (_id) => '/house/' + _id,
            providesTags: ['Houses']
        }),
        createHouse: builder.mutation({
            query: (newHouse) => ({
                url: '/house',
                method: 'POST',
                body: newHouse
            }),
            invalidatesTags: ["Houses"] // Se ejecuta cuando hay un cambio en la BD
        }),
        updateHouse: builder.mutation({
            query: (house) => ({
                url: `/house/${house._id}`, 
                method: 'PATCH',
                body: house 
            }), 
            invalidatesTags: ["Houses", "House"] // Actualiza la lista de casas en tiempo real
        }), 
        deleteHouse: builder.mutation({
            query: (_id) => ({
                url: `/house/${_id}`, 
                method: "DELETE", 
            }), 
            invalidatesTags: ["Houses"]
        }),
        uploadImage: builder.mutation({
            query: (body) => ({
                url: `/upload/${body._id}/house`, 
                method: "POST", 
                body: body.file
            }),
            invalidatesTags: ["Houses"]
        }),
    })
})

export const {
    useGetHousesQuery, 
    useGetHouseByIdQuery, 
    useCreateHouseMutation, 
    useUpdateHouseMutation, 
    useDeleteHouseMutation, 
    useUploadImageMutation, 
} = apiHousesSlice