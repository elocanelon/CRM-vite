import Formulario from "../component/formulario"

const NuevoCliente = () => {
    return (
        <div>
            <h1 className="font-black text-4xl text-blue-900">Nuevo cliente</h1>
            <p className="mt-3">Llena los siguientes campos para registrar un nuevo clientes</p>

            <Formulario />
        </div>
    )
}

export default NuevoCliente