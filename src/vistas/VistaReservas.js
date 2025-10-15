import React, { useState } from "react";
import StyleVistaReservas from "../styles/VistaReservas.module.css";

export default function PanelReservas() {
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Token del admin guardado en localStorage (tras iniciar sesión)
  const token = localStorage.getItem("token");

  const manejarCambioFecha = (e) => {
    const fecha = e.target.value;
    // Evita duplicados
    if (fecha && !fechasSeleccionadas.includes(fecha)) {
      setFechasSeleccionadas([...fechasSeleccionadas, fecha]);
    }
  };

  const eliminarFecha = (fecha) => {
    setFechasSeleccionadas(fechasSeleccionadas.filter((f) => f !== fecha));
  };

  const filtrarReservas = async () => {
    if (fechasSeleccionadas.length === 0) {
      setError("Debes seleccionar al menos una fecha.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:8080/api/reservas/admin/filtrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fechasSeleccionadas),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error en la respuesta del servidor");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setReservas(data);
      } else if (data.message) {
        setReservas([]);
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarReserva = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta reserva?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/reservas/admin/eliminar/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error al eliminar");

      alert(data.message);
      setReservas(reservas.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div className={StyleVistaReservas.contenedor}>
      <h2 className={StyleVistaReservas.titulo}>Panel de Reservas (Administrador)</h2>

      <div className={StyleVistaReservas.filtro}>
        <h3>Seleccionar Fechas</h3>
        <input type="date" onChange={manejarCambioFecha} className={StyleVistaReservas.inputFecha} />

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

        <button onClick={filtrarReservas} className={StyleVistaReservas.btnFiltrar}>
          {loading ? "Cargando..." : "Filtrar Reservas"}
        </button>
      </div>

      {error && <p className={StyleVistaReservas.error}>{error}</p>}

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
                    <button
                      onClick={() => eliminarReserva(reserva.id)}
                      className={StyleVistaReservas.btnEliminar}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p className={StyleVistaReservas.sinResultados}>No hay reservas para mostrar.</p>
        )}
      </div>
    </div>
  );
}
