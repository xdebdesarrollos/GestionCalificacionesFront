import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditarMateria() {
    const { nom_materia } = useParams();
    const [materia, setMateria] = useState({ nom_materia: "" });
    const navigate = useNavigate();

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

    useEffect(() => {
        async function obtenerMateria() {
            try {
                const response = await fetch(`http://localhost:8081/materia/${nom_materia}`, {
                    method: 'GET',
                });
                const data = await response.json();

                if (response.ok) {
                    setMateria(data);
                } else {
                    toast.error(data.message, toastConf);
                }
            } catch (error) {
                toast.error(`Error: ${error.message}`, toastConf);
            }
        }
        if (nom_materia) {
            obtenerMateria();
        }
    }, [nom_materia]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMateria({ ...materia, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8081/materia/${nom_materia}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(materia),
            });

            if (response.ok) {
                toast.success("Materia actualizada con éxito.", toastConf);
                navigate("/materias");
            } else {
                const data = await response.json();
                toast.error(data.message || "Error al actualizar la materia.", toastConf);
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, toastConf);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Editar Materia</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nom_materia" className="form-label">
                        Nombre de la Materia
                    </label>
                    <input
                        type="text"
                        id="nom_materia"
                        name="nom_materia"
                        className="form-control"
                        value={materia.nom_materia}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    Guardar Cambios
                </button>
                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/materias")}
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
}
