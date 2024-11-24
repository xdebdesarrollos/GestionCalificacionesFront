import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Materias() {
    const [materias, setMaterias] = useState([]);

    const toastConf = {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    };

    // Obtener materias al cargar el componente
    useEffect(() => {
        async function obtenerDatos() {
            try {
                const parametros = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: sessionStorage.getItem('token'),
                    },
                };
                const url = "http://localhost:8081/materia";

                let response = await fetch(url, parametros);
                let body = await response.json();

                if (response.ok) {
                    setMaterias(body);
                } else {
                    toast.error(body.message, toastConf);
                }
            } catch (error) {
                toast.error(error.message, toastConf);
            }
        }
        obtenerDatos();
    }, []);

    // Función para eliminar una materia
    const eliminarMateria = async (nom_materia) => {
        try {
            const url = `http://localhost:8081/materia/${nom_materia}`;
            const response = await fetch(url, { method: 'DELETE' });

            if (response.ok) {
                toast.success(`Materia "${nom_materia}" eliminada con éxito.`, toastConf);
                // Actualizar la lista de materias después de eliminar
                setMaterias(materias.filter(materia => materia.nom_materia !== nom_materia));
            } else {
                const body = await response.json();
                toast.error(body.message || `Error al eliminar la materia "${nom_materia}".`, toastConf);
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, toastConf);
        }
    };

    const filas = materias.map((materia, index) => {
        return (
            <tr key={index}>
                <td>{materia.id_materia}</td>
                <td>{materia.nom_materia}</td>
                <td>
                    <Link to={`/materia/${materia.nom_materia}`} className="btn btn-primary">
                        <span className="material-symbols-outlined">Editar</span>
                    </Link>

                    <button
                        className="btn btn-danger"
                        onClick={() => eliminarMateria(materia.nom_materia)}
                    >
                        <span className="material-symbols-outlined">Eliminar</span>
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <>
            <div>
                <Link to={`/materias/crear`} className="btn btn-primary">
                    <span className="material-symbols-outlined">Crear</span>
                </Link>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre Materia</th>
                    </tr>
                </thead>
                <tbody>
                    {materias.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No hay materias registradas.
                            </td>
                        </tr>
                    ) : (
                        filas
                    )}
                </tbody>
            </table>
        </>
    );
}
