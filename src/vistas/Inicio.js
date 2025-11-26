import React from "react";
import { Carousel } from "react-bootstrap";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/Pascual2.jpg";
import styles from "../styles/Inicio.module.css";
import SotwareImg from "../assets/IngeSotf.png";
import ElectricaImg from "../assets/IngeElectr.png";
import MaterialesImg from "../assets/IngeMater.png";
import LaboratorioImg from "../assets/labrobotica.jpg";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();

  const programas = [
    {
      titulo: "Ingeniería de Sotfware",
      descripcion:
        "Formamos profesionales con enfoque en desarrollo de software, redes y ciberseguridad para su uso en la nueva digital que llega con grandes retos.",
      img: SotwareImg,
      link: "https://pascualbravo.edu.co/facultades/facultad-de-ingenieria/programas/ingenieria-de-software/"
    },
    {
      titulo: "Ingeniería de Materiales",
      descripcion:
        "Propone soluciones a problemáticas que se puedan abordar desde áreas de trabajo como la producción, la electrónica, la electricidad, entre otras.",
      img: MaterialesImg, 
      link: "https://pascualbravo.edu.co/facultades/facultad-de-ingenieria/programas/ingenieria-materiales/"
    },
    {
      titulo: "Ingeniería Electrónica",
      descripcion:
        "Integra conocimiento teórico y práctico para un desarrollo de habilidades que permitan su aplicación en el sector eléctrico.",
      img: ElectricaImg,
      link: "https://pascualbravo.edu.co/facultades/facultad-de-ingenieria/programas/ingenieria-electrica/"
    },
  ];

  const espacios = [
    {
      nombre: "Auditorio Principal",
      descripcion:
        "Espacio amplio con capacidad para más de 200 personas, ideal para conferencias, exposiciones y ceremonias institucionales.",
      img: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe",
    },
    {
      nombre: "Laboratorio de Robótica",
      descripcion:
        "Equipado con brazos robóticos, sensores y plataformas de automatización para prácticas de control y programación.",
      img: LaboratorioImg,
    },
    {
      nombre: "Sala de Innovación",
      descripcion:
        "Un entorno moderno diseñado para el trabajo colaborativo, el emprendimiento y el desarrollo de ideas tecnológicas.",
      img: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9",
    },
  ];

  return (
    <div>
      {/* Banner principal */}
      <Carousel fade interval={4000} className={styles.carousel}>
        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.bannerImg}`}
            src={banner1}
            alt="Concurso de Robótica"
          />
          <Carousel.Caption className={styles.caption}>
            <h3>Concurso de Robótica</h3>
            <p>23 y 28 de septiembre en Pascual Bravo.</p>
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

      {/* Misión y visión */}
      <section className={styles.infoSection}>
        <div className={styles.infoContainer}>
          <h2>Bienvenido a la Facultad de Ingeniería</h2>
          <p>
            Impulsamos la innovación tecnológica formando profesionales líderes
            en ciencia, tecnología e investigación. Nuestro compromiso es con la
            excelencia académica y la transformación digital del entorno.
          </p>

          <div className={styles.misionVision}>
            <div>
              <h3>Misión</h3>
              <p>
                Formar ingenieros éticos, creativos y competentes para resolver
                los retos tecnológicos de la sociedad.
              </p>
            </div>
            <div>
              <h3>Visión</h3>
              <p>
                Ser un referente nacional e internacional en educación
                tecnológica, innovación y transferencia de conocimiento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programas destacados */}
      <section className={styles.featuredPrograms}>
        <h2>Nuestra Oferta Académica Destacada</h2>
          <p className={styles.subtitle}>
          Explora los programas que impulsan tu formación profesional.
          </p>
          
          <div className={styles.cards}>
      {programas.map((p, i) => (
        <div className={styles.card} key={i}>
          <img src={p.img} alt={p.titulo} />
          <div className={styles.cardInfo}>
            <h3>{p.titulo}</h3>
            <p>{p.descripcion}</p>

          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Ver más</button>
          </a>
        </div>
      </div>
        ))}
      </div>
     </section>



      {/* Espacios institucionales */}
      <section className={styles.espaciosSection}>
        <h2>Espacios Institucionales Disponibles</h2>
        <p className={styles.espaciosIntro}>
          Nuestra universidad cuenta con espacios académicos y tecnológicos
          diseñados para la formación integral de los estudiantes. Estos
          espacios fomentan la práctica, la investigación y la innovación.
        </p>
        <div className={styles.cards}>
          {espacios.map((e, i) => (
            <div className={styles.card} key={i}>
              <img src={e.img} alt={e.nombre} />
              <div className={styles.cardInfo}>
                <h3>{e.nombre}</h3>
                <p>{e.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>
          <h3>Contáctanos</h3>
          <p>Email: info@universidad.edu.co</p>
          <p>Teléfono: (604) 123 4567</p>
          <p>Dirección: Calle 73 #73-73, Medellín</p>
        </div>
        <div>
          <p>© 2025 Universidad Tecnológica — Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
