import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import "../css/estilo.css";// Archivo CSS actualizado
import React, { useState } from "react";


const CrearCuenta = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    cuil: "",
    fechaNacimiento: "",
    email: "",
    celular: "",
    domicilio: "",
    id_loc: "",
    rol_usr: "",
    nombre_usr: "",
    psw_usr: "",
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
      const response = await fetch("http://localhost:8081/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("La cuenta fue creada exitosamente.");
        setFormData({
          nombre: "",
          apellido: "",
          dni: "",
          cuil: "",
          fec_nac: "",
          email: "",
          cel: "",
          domicilio: "",
          id_loc: "",
          rol_usr: "",
          nombre_usr: "",
          psw_usr: "",
        }); // Resetear formulario
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Hubo un error al crear la cuenta.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="crear-cuenta-container">
      <h1>Crear Cuenta</h1>
      <h2>Datos de Persona</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dni">D.N.I.:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cuil">CUIL:</label>
          <input
            type="text"
            id="cuil"
            name="cuil"
            value={formData.cuil}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fec_nac"
            name="fec_nac"
            value={formData.fec_nac}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cel">Celular:</label>
          <input
            type="text"
            id="cel"
            name="cel"
            value={formData.celr}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="domicilio">Domicilio:</label>
          <input
            type="text"
            id="domicilio"
            name="domicilio"
            value={formData.domicilio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="localidad">Localidad:</label>
          <select
            id="id_loc"
            name="id_loc"
            value={formData.localidad}
            onChange={handleChange}
          >
            <option value="">Seleccione localidad</option>
            <option value="1">Jardín América</option>
            <option value="2">Leoni</option>
            <option value="3">Hipólito Yrigoyen</option>
            <option value="4">Colonia Oasis</option>
          </select>
        </div>
        <br />
        <h2>Datos de Usuario</h2>
        <div>
          <br />
          <label htmlFor="rol_usr">Rol de Usuario:</label>
          <select
            id="rol_usr"
            name="rol_usr"
            value={formData.rol_usr}
            onChange={handleChange}
          >
            <option value="">Seleccione el Rol</option>
            <option value="1">Administrador</option>
            <option value="2">Preceptor</option>
            <option value="3">Profesor</option>
            <option value="4">Director</option>
            <option value="5">Tutor</option>
            <option value="6">Alumno</option>
          </select>
        </div>
        <div>
          <label htmlFor="nombre_usr">Nombre de Usuario:</label>
          <input
            type="text"
            id="nombre_usr"
            name="nombre_usr"
            value={formData.nombre_usr}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="psw_usr">Elija una Contraseña:</label>
          <input
            type="text"
            id="psw_usr"
            name="psw_usr"
            value={formData.psw_usr}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Crear Cuenta</button>
        </div>
      </form>
      
      {/* Mostrar mensajes de error o éxito */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default CrearCuenta;



