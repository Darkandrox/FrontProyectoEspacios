// src/vistas/Nosotros.jsx
import React from "react";
import styles from "../styles/Nosotros.module.css";
import andresImg from "../assets/Andres.jpg";
import susanaImg from "../assets/Susana.jpg";
import wendyImg from "../assets/Wendy.jpg";
import juanImg from "../assets/Juan.jpg";

const Nosotros = () => {
  const teamMembers = [

    {
      nombre: "Andres Gonzalez",
      rol: "Desarrollador Backend/Frontend/fullstack",
      img: andresImg,
    },
    {
      nombre: "Maria Benitez",
      rol: "Diseñador UX/UI/Administrador de Contenidos",
      img: susanaImg,
    },
        {
      nombre: "Wuendy Amaya",
      rol: "Gestora de Proyectos/Marketing",
      img: wendyImg,
    },
    {
      nombre: "Juan Fernando Genes",
      rol: "Desarrollador Frontend/diseñador",
      img: juanImg,
    },

  ];

  return (
    <div className={styles.container}>


      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>Sobre Nosotros</h1>
          <p>
           Como estudiantes universitarios, compartimos la pasión por la tecnología y la
            educación. Nuestro propósito es aportar ideas innovadoras que mejoren la vida
            académica y fomenten el aprendizaje en la universidad.
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
