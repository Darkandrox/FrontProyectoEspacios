// src/vistas/Nosotros.jsx
import React from "react";
import styles from "../styles/Nosotros.module.css";

const Nosotros = () => {
  const teamMembers = [

    {
      nombre: "Andres Gonzalez",
      rol: "Desarrolladora Frontend",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      nombre: "Susana",
      rol: "Diseñador UX/UI",
      img: "https://randomuser.me/api/portraits/men/56.jpg",
    },
        {
      nombre: "Wendy",
      rol: "Director de Proyecto",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      nombre: "Juan",
      rol: "Desarrolladora Frontend",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },

  ];

  return (
    <div className={styles.container}>


      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>Sobre Nosotros</h1>
          <p>
            Somos un equipo apasionado por la innovación y la tecnología en la
            educación. Nuestro objetivo es mejorar la experiencia de los
            estudiantes en la universidad.
          </p>
        </div>
      </section>

      {/* Equipo */}
      <section className={styles.team}>
        <h2>Conoce a nuestro equipo</h2>
        <div className={styles.cards}>
          {teamMembers.map((member, i) => (
            <div className={styles.card} key={i}>
              <img src={member.img} alt={member.nombre} />
              <div className={styles.cardInfo}>
                <h3>{member.nombre}</h3>
                <p>{member.rol}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
