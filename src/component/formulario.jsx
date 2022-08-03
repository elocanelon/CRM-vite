import { useNavigate } from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"

import Spinner from "../component/spinner"


const Formulario = ({cliente, cargando}) => {
    
    const Navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, "El nombre es muy corto")
                    .max(20, "El nombre es muy largo")
                    .required("El nombre del cliente es Obligatorio"),
        empresa: Yup.string()
                    .required("La empresa del cliente es obligatorio"),
        email: Yup.string()
                  .email("El email debe ser valido")
                  .required("El Email es obligatorio"),
        telefono: Yup.number()
                     .positive()
                     .integer()
                     .typeError("El numero no es valido"),
        notas: ""
    })

    const handleSubmit = async(value) => {
        try {
            
            if(cliente.id){
                const url = `http://localhost:4000/clientes/${cliente.id}`
                const respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(value),
                    headers: {
                        'Content-Type': 'application/json'
                    }                
                })

                await respuesta.json()
                Navigate("/clientes")
                } else {
            const url = "http://localhost:4000/clientes"

              const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(value),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await respuesta.json()
            Navigate("/clientes")
            
            }
        } catch (error) {
            console.log(error)   
        }

       await respuesta.json()
        Navigate("/clientes")
    }

    return (
        cargando ? <Spinner /> : (
        <div 
        className="bg-white mt-10 px-5 py-10 rounded shadow-md md:w-3/4 mx-auto">

            <h1 
            className="text-gray-600 font-bold text-xl uppercase text-center">
               {cliente.nombre ? "Editar cliente" : "Agregar cliente"}
            </h1>

            <Formik 
                initialValues={{
                    nombre: cliente.nombre ? cliente.nombre : "",
                    empresa: cliente.empresa ? cliente.empresa : "",
                    email: cliente.email ? cliente.email : "",
                    telefono: cliente.telefono ? cliente.telefono : "",
                    notas: cliente.notas ? cliente.notas : ""
                }}
                enableReinitialize={true}
                onSubmit={( async(values, {resetForm}) =>{ 
                    await handleSubmit(values)

                    resetForm()

                    Navigate("/clientes")
                    })}
                validationSchema={nuevoClienteSchema}>

                {({errors, touched}) => { 
                    return (

                <Form className="mt-10">
                    <div className="mb-4"> 
                        <label className="text-gray-800" 
                        htmlFor="nombre">Nombre:</label>
                        <Field  
                            id="nombre"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Nombre del cliente" 
                            name="nombre"
                            />
                        
                        {errors.nombre && touched.nombre ? (
                            <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
                                {errors.nombre}
                            </div>
                        ) : null }

                    </div>

                    <div className="mb-4"> 
                        <label className="text-gray-800" 
                        htmlFor="Empresa">Empresa:</label>
                        <Field  
                            id="Empresa"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Empresa del cliente"
                            name="empresa" />
                             {errors.empresa && touched.empresa ? (
                            <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
                                {errors.empresa}
                            </div>
                        ) : null }
                    
                    </div>

                    <div className="mb-4"> 
                        <label className="text-gray-800" 
                        htmlFor="email">Correo:</label>
                        <Field  
                            id= "email"
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Correo del cliente"
                            name="email" />
                        {errors.email && touched.email ? (
                            <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
                                {errors.email}
                            </div>
                        ) : null }
                    
                    </div>

                    <div className="mb-4"> 
                        <label className="text-gray-800" 
                        htmlFor="telefono">Telefono:</label>
                        <Field  
                            id="telefono"
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Telefono del cliente" 
                            name="telefono"/>
                      
                      {errors.telefono && touched.telefono ? (
                            <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
                                {errors.telefono}
                            </div>
                        ) : null }

                    
                    </div>

                    <div className="mb-4"> 
                        <label className="text-gray-800" 
                        htmlFor="notas">Notas:</label>
                        <Field  
                            as="textarea"
                            id="notas"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 h-40"
                            placeholder="Notas sobre el cliente" 
                            name="notas"
                            />
                    </div>
                   
                    <input type="submit" value={cliente.nombre ? "Editar cliente" : "Agregar cliente"} className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg" />
                </Form>
                 )}}
            </Formik>
        </div>

        ))
}

Formulario.defaultProps = {
    cliente:{},
    cargando: false
}

export default Formulario 