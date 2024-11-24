import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Materias = () => {
    const [materias, setMaterias] = useState([]);
    const configToast = {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
    }

    useEffect(() => {
        async function obtenerDatos() {
            try {
                const parametros = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': sessionStorage.getItem('token'),
                    },
                };

                const url = "http://localhost:8081/materia";

                const response = await fetch(url, parametros);
                const body = await response.json();

                if (response.ok) {
                    setMaterias(body);
                } else {
                    toast.error(body.message, configToast);
                }
            } catch (error) {
                console.error(error);
            }
        };

        obtenerDatos();
    }, []);


    //  const tokenDecoded = jwt_decode(sessionStorage.getItem('token'));
    //  const rol = tokenDecoded.rol;

    return (
        <>
            <div className="d-flex flex-wrap justify-content-start">
                {materias.map((materia, index) => (
                    <Card key={index} style={{ width: '18rem', margin: '10px' }}>
                        <Card.Body>
                            <Card.Title>{materia.nom_materia}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{materia.id_materia}</Card.Subtitle>
                            <Card.Text>Nombre {materia.nom_materia}</Card.Text>
                            {/* aca podria agregar la marca */}
                            <div className="d-flex justify-content-end align-items-baseline">
                                <Button as={Link} to={`/materia/${materia.id_materia}`} variant="primary">
                                    Editar
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            {/* 
            {rol === 'Administrador' && (
                <Link to={`/vehiculo/crear/`} className='btn btn-primary'>
                    <span className="material-symbols-outlined">Crear</span>
                </Link>
            )} */}

            <Link to={`/materia/`} className='btn btn-primary'>
                <span className="material-symbols-outlined">Crear</span>
            </Link>
        </>
    );
};

export default Materias;