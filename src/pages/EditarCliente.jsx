import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Formulario from "../component/formulario"

const EditarCliente = () => {
    
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
            <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
            <p className="mt-3">Utiliza este formulario para Editar cliente</p>

            {cliente?.nombre ? (
            <Formulario 
                    cliente={cliente}
                    cargando={cargando}/>
             ) : <p>Cliente id no valido</p>
             }       
        </div>
    )
}

export default EditarCliente