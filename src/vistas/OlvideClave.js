import React, { useState } from "react";
import styles from "../styles/OlvideClave.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMensaje("⚠️ Ingresa un correo válido");
      setExito(false);
      return;
    }

    setCargando(true);
    setMensaje("");

    try {
      // Llamada al backend (Spring Boot)
      const response = await fetch(
        `http://localhost:8080/api/auth/recuperar?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.text();

      if (response.ok) {
        setExito(true);
        setMensaje(data);
      } else {
        setExito(false);
        setMensaje(data || "❌ Error al enviar el correo de recuperación");
      }
    } catch (error) {
      console.error("Error al recuperar clave:", error);
      setExito(false);
      setMensaje("❌ Error de conexión con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.forgotContainer}>
      <div className={styles.forgotBox}>
        {mensaje && (
          <div
            className={`${styles.alert} ${
              exito ? styles.success : styles.error
            }`}
          >
            {mensaje}
          </div>
        )}

        <h2>Recuperar Contraseña</h2>
        <p className={styles.textInfo}>
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={cargando}
            />
          </div>

          <button
            type="submit"
            className={styles.btnRecover}
            disabled={cargando}
          >
            {cargando ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        <p className={styles.backLogin}>
          ¿Recordaste tu contraseña?{" "}
          <a href="/login" className={styles.link}>
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
