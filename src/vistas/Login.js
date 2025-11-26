import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // RESTRICCIÓN DE DOMINIO DEL CORREO (FRONTEND)
    const requiredDomain = "@pascualbravo.edu.co";
    if (!email.toLowerCase().endsWith(requiredDomain)) {
      setError(
        ` Solo se permite iniciar sesión con correos del dominio ${requiredDomain}.`
      );
      return; // Detiene la ejecución si el dominio es incorrecto
    }

    // Limpia errores previos si la validación de dominio pasa
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Intentar leer el error del backend si existe
        const errorData = await response.json();
        const errorMessage = errorData.error || "Credenciales incorrectas";
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Guarda token y correo en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.email);

      // (opcional) muestra el contenido guardado en consola
      //console.log("Inicio de sesión exitoso:", data);

      // SOLUCIÓN: Dispara manualmente el evento 'storage' para que el Navbar
      // (u otros componentes que escuchen el evento) sepa que debe actualizarse.
      window.dispatchEvent(new Event("storage"));

      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginBox}>
        <h2>Iniciar Sesión</h2>

        {/* Añadimos un estilo para que el mensaje de error sea más claro */}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.loginButton}>
          Iniciar sesión
        </button>

        <p className={styles.forgotPassword}>
          <a href="olvideclave">¿Olvidaste tu contraseña?</a>
        </p>
      </form>
    </div>
  );
};

export default Login;