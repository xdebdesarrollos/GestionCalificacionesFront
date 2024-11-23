import React, { useState } from "react";
import "../css/LandingPage.css";

const LandingPage = () => {
  // Estado inicial para probar diferentes roles
  const [userRole, setUserRole] = useState("profesor"); // Cambia según el rol: "alumno", "director", etc.

  return (
    <div className="landing-page-container">
      {/* Profesor */}
      {userRole === "profesor" && (
        <div className="landing-content">
          <h1>Bienvenido, Profesor</h1>
          <p>Accede a los listados de clases, calificaciones y carga de notas.</p>
        </div>
      )}

      {/* Preceptor */}
      {userRole === "preceptor" && (
        <div className="landing-content">
          <h1>Bienvenido, Preceptor</h1>
          <p>Gestiona la asistencia de los alumnos y supervisa los horarios.</p>
        </div>
      )}

      {/* Director */}
      {userRole === "director" && (
        <div className="landing-content">
          <h1>Bienvenido, Director</h1>
          <p>Supervisa el rendimiento académico y administra el sistema.</p>
        </div>
      )}

      {/* Tutor */}
      {userRole === "tutor" && (
        <div className="landing-content">
          <h1>Bienvenido, Tutor</h1>
          <p>Consulta el progreso académico de tu hijo/a y recibe notificaciones.</p>
        </div>
      )}

      {/* Alumno */}
      {userRole === "alumno" && (
        <div className="landing-content">
          <h1>Bienvenido, Alumno</h1>
          <p>Accede a tus calificaciones, horarios y recursos educativos.</p>
        </div>
      )}

      {/* Contenido predeterminado */}
      {!["profesor", "preceptor", "director", "tutor", "alumno"].includes(userRole) && (
        <div className="landing-content">
          <h1>Bienvenido al sistema</h1>
          <p>Por favor, verifica tu rol.</p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;


