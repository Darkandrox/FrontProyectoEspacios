import React, { useEffect, useState } from "react";
import StyleVistaReservas from "../styles/VistaReservas.module.css";

export default function PanelReservasAdmin() {
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");



  // ✅ Manejar fechas del filtro
  const manejarCambioFecha = (e) => {
    const fecha = e.target.value;
    if (fecha && !fechasSeleccionadas.includes(fecha)) {
      setFechasSeleccionadas([...fechasSeleccionadas, fecha]);
    }
  };

  const eliminarFecha = (fecha) => {
    setFechasSeleccionadas(fechasSeleccionadas.filter((f) => f !== fecha));
  };

  // ✅ Filtrar reservas por fecha
  const filtrarReservas = async () => {
  if (fechasSeleccionadas.length === 0) {
    setError("Debes seleccionar al menos una fecha.");
    return;
  }

  try {
    setLoading(true);
    setError("");
    const response = await fetch(
      "${API_BASE_URL}/api/reservas/admin/filtrar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fechasSeleccionadas),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Error al filtrar reservas");
    }

    // 👇 Corrección importante aquí
    let data = [];
    const text = await response.text();
    if (text) {
      data = JSON.parse(text);
    }

    setReservas(Array.isArray(data) ? data : []);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  // ✅ Cancelar una reserva (NO eliminar)
  const cancelarReserva = async (id) => {
    if (!window.confirm("¿Seguro que deseas cancelar esta reserva?")) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/reservas/${id}/cancelar`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al cancelar");

      alert("Reserva cancelada correctamente");
      setReservas(
        reservas.map((r) =>
          r.id === id ? { ...r, estado: "CANCELADA" } : r
        )
      );
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className={StyleVistaReservas.contenedor}>
      <h2 className={StyleVistaReservas.titulo}>Panel de Reservas (Administrador)</h2>

      {/* ✅ Filtro de fechas */}
      <div className={StyleVistaReservas.filtro}>
        <h3>Seleccionar Fechas</h3>
        <input
          type="date"
          onChange={manejarCambioFecha}
          className={StyleVistaReservas.inputFecha}
        />
        <div className={StyleVistaReservas.listaFechas}>
          {fechasSeleccionadas.map((fecha) => (
            <span key={fecha} className={StyleVistaReservas.fechaItem}>
              {fecha}
              <button
                onClick={() => eliminarFecha(fecha)}
                className={StyleVistaReservas.btnEliminarFecha}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <button
          onClick={filtrarReservas}
          className={StyleVistaReservas.btnFiltrar}
        >
          {loading ? "Cargando..." : "Filtrar Reservas"}
        </button>
      </div>

      {error && <p className={StyleVistaReservas.error}>{error}</p>}

      {/* ✅ Tabla de reservas */}
      <div className={StyleVistaReservas.tablaContenedor}>
        {reservas.length > 0 ? (
          <table className={StyleVistaReservas.tabla}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Espacio</th>
                <th>Fecha</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Reservado por</th>
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
                  <td>
                    {reserva.usuario
                      ? `${reserva.usuario.nombre || ""} ${reserva.usuario.apellido || ""}`.trim()
                      : "Desconocido"}
                  </td>
                  <td>{reserva.estado || "ACTIVA"}</td>
                  <td>
                    {reserva.estado !== "CANCELADA" && (
                      <button
                        onClick={() => cancelarReserva(reserva.id)}
                        className={StyleVistaReservas.btnEliminar}
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && (
            <p className={StyleVistaReservas.sinResultados}>
              No hay reservas para mostrar.
            </p>
          )
        )}
      </div>
    </div>
  );
}
