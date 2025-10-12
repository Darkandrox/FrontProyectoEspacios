import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciales incorrectas");
    }

    const data = await response.json();

    // ✅ Guarda token y correo en localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("userEmail", data.email);

    // (opcional) muestra el contenido guardado en consola
    console.log("Inicio de sesión exitoso:", data);

    navigate("/home");
  } catch (error) {
    setError(error.message);
  }
};

  

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginBox}>
        <h2>Iniciar Sesión</h2>

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
          <a href="olvidePass">¿Olvidaste tu contraseña?</a>
        </p>
      </form>
    </div>
  );
  
};

export default Login;