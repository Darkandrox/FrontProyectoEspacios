import React, { useEffect, useState } from "react";
import StyleVistaReservas from "../styles/VistaReservas.module.css";

export default function PanelReservas() {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  //  Cargar reservas del usuario autenticado
  const cargarReservas = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("${API_BASE_URL}/api/reservas/mias", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error al cargar reservas");

      setReservas(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  //  Cancelar una reserva (sin eliminar)
  const cancelarReserva = async (id) => {
    if (!window.confirm("¿Seguro que deseas cancelar esta reserva?")) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/reservas/${id}/cancelar`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error al cancelar reserva");

      alert(data.message || "Reserva cancelada correctamente");

      // Actualiza el estado local (sin recargar toda la lista)
      setReservas(
        reservas.map((r) =>
          r.id === id ? { ...r, estado: "Cancelada" } : r
        )
      );
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className={StyleVistaReservas.contenedor}>
      <h2 className={StyleVistaReservas.titulo}>Mis Reservas</h2>

      {error && <p className={StyleVistaReservas.error}>{error}</p>}

      {loading ? (
        <p>Cargando reservas...</p>
      ) : reservas.length > 0 ? (
        <div className={StyleVistaReservas.tablaContenedor}>
          <table className={StyleVistaReservas.tabla}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Espacio</th>
                <th>Fecha</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.espacio?.nombre || "Sin nombre"}</td>
                  <td>{reserva.fecha}</td>
                  <td>{reserva.horaInicio}</td>
                  <td>{reserva.horaFin}</td>
                  <td
                    className={
                      reserva.estado === "Cancelada"
                        ? StyleVistaReservas.estadoCancelada
                        : StyleVistaReservas.estadoActiva
                    }
                  >
                    {reserva.estado}
                  </td>
                  <td>
                    {reserva.estado !== "Cancelada" && (
                      <button
                        onClick={() => cancelarReserva(reserva.id)}
                        className={StyleVistaReservas.btnCancelar}
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={StyleVistaReservas.sinResultados}>
          No tienes reservas registradas.
        </p>
      )}
    </div>
  );
}
