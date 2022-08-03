const Cliente = ({cliente}) => {
    const { nombre, empresa, email, telefono, notas, id} = cliente
    
    return(
        <tr>
            <td className="p-3">{nombre}</td>
            <td className="p-3">
                <p><span className="text-gray-800 uppercase font-bold">Email:</span>{email}</p>
                <p><span className="text-gray-800 uppercase font-bold">Telefono:</span>{telefono}</p>
            </td>
            <td className="p-3">{empresa}</td>
            <td className="p-3">
            <button type="button" className="bg-blue-600 block w-full text-white p-2 uppercase font-bold text-xs hover:bg-blue-700">Mas info</button>
                <button type="button" className="bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs hover:bg-yellow-700 mt-3">Editar</button>
                <button type="button" className="bg-red-600 block w-full text-white p-2 uppercase font-bold text-xs hover:bg-red-700 mt-3">Eliminar</button>
            </td>
        </tr>
    )
}

export default Cliente