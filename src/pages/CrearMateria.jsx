import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import "../css/estilo.css";// Archivo CSS actualizado
import React, { useState } from "react";


const CrearMateria = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nom_materia: "",
  });

  // Estado para manejar errores y mensajes de éxito
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de la página
    setError(""); // Limpiar errores previos
    setSuccess(""); // Limpiar mensajes previos

    try {
      const response = await fetch("http://localhost:8081/materia/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("La materia fue creada exitosamente.");
        setFormData({
          nom_materia: "",
        });
         // Resetear formulario
        window.location.href = "/materias";
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Hubo un error al crear la Materia.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <>
    <div className="crear-materia-container">
      <h2>Datos de Materia</h2>     
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="CrearMateria">Nombre Materia:</label>
          <input
            type="text"
            id="nom_materia"
            name="nom_materia"
            value={formData.nom_materia}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Crear Materia</button>
        </div>
      </form>
      
      {/* Mostrar mensajes de error o éxito */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
    </>
  );
};

export default CrearMateria;



