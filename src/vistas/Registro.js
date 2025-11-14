import React, { useState } from "react";
import StyleRegistro from "../styles/Registro.module.css";

export default function RegistroUsuarios() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
    role: "ROLE_USER",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const token = localStorage.getItem("token"); // Solo necesario si creas admin
      const response = await fetch("${API_BASE_URL}/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(formData.role === "ROLE_ADMIN" && token
            ? { Authorization: `Bearer ${token}` }
            : {}),
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(`✅ ${data.mensaje}`);
      } else {
        setError(`❌ ${data.error}`);
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className={StyleRegistro.contenedor}>
      <h2 className={StyleRegistro.titulo}>Registro de Usuarios</h2>
      <form onSubmit={handleSubmit} className={StyleRegistro.formulario}>
        <div className={StyleRegistro.campo}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className={StyleRegistro.campo}>
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className={StyleRegistro.campo}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={StyleRegistro.campo}>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={StyleRegistro.campo}>
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className={StyleRegistro.campo}>
          <label>Rol:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={StyleRegistro.select}
          >
            <option value="ROLE_USER">Usuario</option>
            <option value="ROLE_ADMIN">Administrador</option>
          </select>
        </div>

        <button type="submit" className={StyleRegistro.boton}>
          Registrar
        </button>
      </form>

      {mensaje && <p className={StyleRegistro.mensaje}>{mensaje}</p>}
      {error && <p className={StyleRegistro.error}>{error}</p>}
    </div>
  );
}
