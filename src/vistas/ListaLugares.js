import React from "react";
import MapaReservas from "./MapaReservas";

export default function ListaLugares() {
  // Muestra el mapa interactivo en la sección de reservas
  const handleBloqueClick = (bloque) => {
    alert(`Mostrar espacios disponibles para: ${bloque}`);
    // Aquí podrías mostrar un modal, navegar o filtrar espacios
  };

  return <MapaReservas onBloqueClick={handleBloqueClick} />;
}
