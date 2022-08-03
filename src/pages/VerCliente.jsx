import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Spinner from "../component/spinner"

const VerCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)
    
    const { id } = useParams()

    useEffect(() => {
        
        setCargando(!cargando)
        const obtenerClienteApi = async() => {
            try {

                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                
                setCliente(resultado)
                
            } catch (error) {
                
            }
            setCargando(false)
        }


        obtenerClienteApi()
    }, [])
    
    return(
        <div>
            {cargando ? <Spinner />: Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (

                <>
            <h1 className="font-black text-4xl text-blue-900">Ver cliente {cliente.nombre}</h1>
            <p className="mt-3">Informacion del cliente</p>
            
            {cliente.nombre && (
            <p className="text-2xl text-gray-800 mt-10"><span className="text-gray-700 uppercase font-bold ">Cliente:</span> {cliente.nombre}</p>
            )}

            {cliente.empresa && (
            <p className="text-2xl text-gray-800 mt-4"><span className="text-gray-700 uppercase font-bold ">Telefono:</span> {cliente.telefono}</p>
            )}

            {cliente.telefono && (    
            <p className="text-2xl text-gray-800 mt-4"><span className="text-gray-700 uppercase font-bold ">Empresa:</span> {cliente.empresa}</p>
            )}
            
            {cliente.notas && (
            <p className="text-2xl text-gray-800 mt-4"><span className="text-gray-700 uppercase font-bold ">Notas:</span> {cliente.notas}</p>
            )}
                </>
            )}
        </div>


    )
}

export default VerCliente