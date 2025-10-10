import React from "react";
import { Carousel } from "react-bootstrap";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import styles from "../styles/Inicio.module.css";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/reservas"); // Redirige a la página de reservas
  };

  const espaciosDestacados = [
    {
      nombre: "Auditorio Principal",
      img: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe",
    },
    {
      nombre: "Laboratorio de Robótica",
      img: "https://images.unsplash.com/photo-1581092580495-4c8e1dba90f6",
    },
    {
      nombre: "Sala de Innovación",
      img: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9",
    },
  ];

  return (
    <div>

      {/* Carousel Banner */}
      <Carousel fade interval={4000} className={styles.carousel}>
        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.bannerImg}`}
            src={banner1}
            alt="Concurso de Robótica"
          />
          <Carousel.Caption className={styles.caption}>
            <h3>Concurso de Robótica</h3>
            <p>23 y 24 de septiembre en Pascual Bravo.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.bannerImg}`}
            src={banner2}
            alt="Simposio Internacional de Energías"
          />
          <Carousel.Caption className={styles.caption}>
            <h3>Simposio Internacional de Energías</h3>
            <p>25 y 26 de septiembre - Teatro La Convención.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.bannerImg}`}
            src={banner3}
            alt="Expo Tecnológica"
          />
          <Carousel.Caption className={styles.caption}>
            <h3>Expo Tecnológica 2025</h3>
            <p>Innovación y tecnología en un solo lugar.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Sección de búsqueda */}
      <section className={styles.searchSection}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <select required>
            <option value="">Tipo de espacio</option>
            <option value="salon">Salón</option>
            <option value="laboratorio">Laboratorio</option>
            <option value="auditorio">Auditorio</option>
          </select>
          <input type="date" required />
          <input type="time" required />
          <input type="time" required />
          <button type="submit">Buscar</button>
        </form>
      </section>

      {/* Espacios destacados */}
      <section className={styles.featured}>
        <h2>Espacios destacados</h2>
        <div className={styles.cards}>
          {espaciosDestacados.map((espacio, i) => (
            <div className={styles.card} key={i}>
              <img src={espacio.img} alt={espacio.nombre} />
              <div className={styles.cardInfo}>
                <h3>{espacio.nombre}</h3>
                <button>Reservar</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Inicio;
