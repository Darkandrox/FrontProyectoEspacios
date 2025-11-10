// src/vistas/Contacto.jsx
import React, { useState } from "react";
import styles from "../styles/Nosotros.module.css";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado: " + JSON.stringify(formData, null, 2));
    setFormData({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    });
  };

  return (
    <div className={styles.container}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>Contáctanos</h1>
          <p>
            ¡Queremos escucharte!
            Cuéntanos qué te ha parecido el sitio o qué te gustaría
            que mejoráramos. Tus ideas nos ayudan a crecer y ofrecer una mejor experiencia.
          </p>
        </div>
      </section>

      {/* Formulario */}
      <section className={styles.contactForm}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre y apellido*"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico*"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="asunto"
            placeholder="Asunto*"
            value={formData.asunto}
            onChange={handleChange}
            required
          />

          <textarea
            name="mensaje"
            placeholder="Escribe tu inquietud*"
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
