import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Modal, Button } from 'react-bootstrap';
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
        theme: 'light'
    }

    useEffect(() => {

        async function obtenerDatos() {
            try {
                const parametros = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': sessionStorage.getItem('token')
                    }
                }
                const url = "http://localhost:8081/materia";

                let response = await fetch(url, parametros)
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
    },
        []
    );


    const filas = materias.map((materia, index) => {
        return (
            <tr key={index}>
                <td>{materia.id_materia}</td>
                <td>{materia.nom_materia}</td>
                <td>
                    <Link to={`/materia/${materia.nom_materia}`} className='btn btn-primary'>
                        <span className="material-symbols-outlined">editar</span>
                    </Link>

                    {/* <button className='btn btn-danger' onClick={() => showModal(vehiculo.vehiculo_id)}>
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    </button> */}
                </td>
            </tr>
        )

    });

    return (
        <>
            <div>

                <Link to={`/materia/`} className='btn btn-primary'>
                    <span className="material-symbols-outlined">Crear</span>
                </Link>

            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre Materia</th>
                    </tr>
                </thead>
                <tbody>
                    {materias.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">No hay materias registradas.</td>
                        </tr>
                    ) : (
                        filas
                    )}
                </tbody>
            </table>

        </>
    )
}