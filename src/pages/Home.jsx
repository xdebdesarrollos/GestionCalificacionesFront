import React, { useEffect, useState } from 'react'
import "../css/home.css";
import imagenHome from "../images/imagen_home.jpeg";

export default function Home() {
  return  (
    <div className="home-container">
      <div className="home-content">
        <h1>Bienvenido al Sistema de Gestión Calificaciones</h1>
        <p>
          En este sistema podrás gestionar y visualizar las calificaciones de
          los estudiantes de manera fácil y eficiente. 
        </p>
      </div>
      <div className="home-image">
        <img src={imagenHome} alt="Gestión de calificaciones" />
      </div>
    </div>
  );
};



