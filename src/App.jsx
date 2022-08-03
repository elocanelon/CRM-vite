import { BrowserRouter, Routes, Route } from "react-router-dom"
import IniciarSesion from "./layout/iniciarSesion"
import Layout from "./layout/layout"
import Inicio from "./pages/inicio"
import LoginForm from "./pages/LoginForm"
import NuevoCliente from './pages/nuevoCliente'
import EditarCliente from "./pages/EditarCliente"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IniciarSesion />}>
            <Route index element={<LoginForm />} />
        </Route>

        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />}/>
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
