import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';


export default function Menu() {
    const navigate = useNavigate();

    const [token, setToken] = useState("");

    useEffect(() => {
        const t = sessionStorage.getItem('token')
        if (t !== token) {
            setToken(t)
            //significa actualizar mi estado interno para tener el ultimo token valido siempre
        }
    });


    function logout() {
        sessionStorage.removeItem('token');
        setToken("");
        navigate('/');
    }

    if (token !== "" && token !== null) {
        //var decoded = jwt_decode(token);
        return (<>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/LandingPage">
                                    Principal
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/materias">
                                    Materias
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    aria-current="page"
                                    to="/cursos">
                                    Cursos
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    to="#">
                                    Mis Datos
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/clinica">Clinica</Link></li>
                                    <li><Link className="dropdown-item" to="/blog">Blog</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button
                                onClick={() => logout()}
                                className='btn btn-outline-danger btn-sm'>
                                <span
                                    className="material-symbols-outlined">
                                    Cerrar Sesión
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>);
    } else {
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                 <nav class="navbar bg-body-tertiary">
                                   <div class="nav-link">
                                     <br />
                                      <a class="navbar-brand" href="/">HOME</a>
                                      <a class="navbar-brand" href="/login">INGRESAR</a>
                                    </div>
                                </nav>
                            </ul>
                        </div>
                    </div>
                </nav >
            </>
        );
    }
}
