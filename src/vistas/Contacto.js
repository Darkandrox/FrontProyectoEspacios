// src/vistas/Contacto.jsx
import React, { useState } from "react";
import styles from "../styles/Nosotros.module.css";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado: " + JSON.stringify(formData));
    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div className={styles.container}>

      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>Contáctanos</h1>
          <p>Estamos aquí para ayudarte. Envíanos un mensaje.</p>
        </div>
      </section>

      {/* Formulario */}
      <section className={styles.contactForm}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="mensaje"
            placeholder="Escribe tu mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
};

export default Contacto;
