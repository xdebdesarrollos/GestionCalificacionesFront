import React, { useState } from "react";
import "../css/LandingPage.css";
const rol_usr = sessionStorage.getItem('rol_usr');
const LandingPage = () => {
  // Estado inicial para probar diferentes roles
 // const [userRole, setUserRole] = useState(nombre_usr); // Cambia según el rol: "alumno", "director", etc.

  return (
    <div className="landing-page-container">
      {/* Administrador */}
      {rol_usr === "Admin" && (
        <div className="landing-content">
          <h1>Bienvenido, Administrador</h1>
          <p>Accede a los listados de clases, calificaciones y carga de notas.</p>
        </div>
      )}
      {/* Profesor */}
      {rol_usr === "Profesor" && (
        <div className="landing-content">
          <h1>Bienvenido, Profesor</h1>
          <p>Accede a los listados de clases, calificaciones y carga de notas.</p>
        </div>
      )}

      {/* Preceptor */}
      {rol_usr === "Preceptor" && (
        <div className="landing-content">
          <h1>Bienvenido, Preceptor</h1>
          <p>Gestiona la asistencia de los alumnos y supervisa los horarios.</p>
        </div>
      )}

      {/* Director */}
      {rol_usr === "Director" && (
        <div className="landing-content">
          <h1>Bienvenido, Director</h1>
          <p>Supervisa el rendimiento académico y administra el sistema.</p>
        </div>
      )}

      {/* Tutor */}
      {rol_usr === "Tutor" && (
        <div className="landing-content">
          <h1>Bienvenido, Tutor</h1>
          <p>Consulta el progreso académico de tu hijo/a y recibe notificaciones.</p>
        </div>
      )}

      {/* Alumno */}
      {rol_usr === "Alumno" && (
        <div className="landing-content">
          <h1>Bienvenido, Alumno</h1>
          <p>Accede a tus calificaciones, horarios y recursos educativos.</p>
        </div>
      )}

      {/* Contenido predeterminado */}
      {!["Profesor", "Preceptor", "Director", "Tutor", "Alumno"] && (
        <div className="landing-content">
          <h1>Bienvenido al sistema</h1>
          <p>Por favor, verifica tu rol.</p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;


