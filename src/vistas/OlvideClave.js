import { useState } from "react";
import axios from "axios";
import styles from "../styles/OlvideClave.module.css";

export default function OlvideClave() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/auth/forgot-password", {
        email,
      });
      setMensaje("✔ Se envió el correo de recuperación");
    } catch (err) {
      setMensaje("❌ Error enviando el correo");
    }
  };

  return (
    <div className={styles.forgotContainer}>
      <div className={styles.forgotBox}>
        <h2>Recuperar contraseña</h2>

        <p className={styles.textInfo}>
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="example@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.btnRecover}>
            Enviar enlace
          </button>
        </form>

        {mensaje && <p className={styles.successContainer}>{mensaje}</p>}

        <div className={styles.backLogin}>
          <a href="/login">← Volver al inicio de sesión</a>
        </div>
      </div>
    </div>
  );
}
