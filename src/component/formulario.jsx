import { useNavigate } from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"


const Formulario = () => {
    
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
            
            const url = "http://localhost:4000/clientes"

            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(value),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resultado = await respuesta.json()
            console.log(resultado)

        } catch (error) {
            console.log(error)   
        }
    }

    return (
        <div 
        className="bg-white mt-10 px-5 py-10 rounded shadow-md md:w-3/4 mx-auto">

            <h1 
            className="text-gray-600 font-bold text-xl uppercase text-center">
                Desde formulario
            </h1>

            <Formik 
                initialValues={{
                    nombre: "",
                    empresa: "",
                    email: "",
                    telefono: "",
                    notas: ""
                }}
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
                   
                    <input type="submit" value="Agregar cliente" className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg" />
                </Form>
                 )}}
            </Formik>
        </div>

    )
}

export default Formulario 