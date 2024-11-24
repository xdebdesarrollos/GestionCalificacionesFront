import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./pages/Login.jsx";
import CrearCuenta from "./pages/CrearCuenta.jsx";
import Menu from "./components/Menu";
import NotFound from "./components/NotFound";
import Componente from "./components/Componente";
import HomeDoctores from "./others/clinica/HomeDoctores";
import Blog from "./others/blog/Blog";
import VehiculoEdit from "./pages/VehiculoEdit";
import VehiculosCard from "./pages/Vehiculos_card";
import ReservaEdit from "./pages/ReservaEdit";
import Reservas from "./pages/Reservas";
import LandingPage from "./pages/LandingPage";
import Materias from "./pages/Materias";
import CrearMateria from "./pages/CrearMateria";
import EditarMateria from "./pages/EditarMateria";

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="container">
                    <Menu />
                    <ToastContainer />
                    <Routes>
                        {/* Landing Page */}
                        <Route path="/" element={<Home />} />

                        {/* Login */}
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/crearcuenta" element={<CrearCuenta />}></Route>
                        <Route path="/landingpage" element={<LandingPage />}></Route>

                        {/* Rutas del MENU */}
                        <Route path="/materias" element={<Materias />} />
                        <Route path="/materias/crear/" element={<CrearMateria />} />
                        <Route path="/materias/editar/:nom_materia" element={<EditarMateria />} />
                        <Route path="/vehiculo/edit/:matricula" element={<VehiculoEdit />} />


                        
                        <Route path="/cursos" element={<Reservas />} />
                        <Route path="/reservas/crear/" element={<ReservaEdit />} />
                        <Route path="/reservas/edit/:matricula" element={<ReservaEdit />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/clinica" element={<HomeDoctores />} />

                        <Route path="/componente" element={<Componente />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>



        </>
    );
}

export default App;