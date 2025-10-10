import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/MapaReservas.module.css";

const bloquesCampus = [
  {
    numero: 1,
    descripcion: "LE Instituto Técnico Industrial Pascual Bravo",
    espacios: [
      ...Array.from({length: 7}, (_, i) => `Salón ${101 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${201 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${301 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${401 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${501 + i}`),
      ...Array.from({length: 3}, (_, i) => `Laboratorio ${i + 1}`)
    ]
  },
  {
    numero: 2,
    descripcion: "Académico",
    espacios: [
      ...Array.from({length: 7}, (_, i) => `Salón ${101 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${201 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${301 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${401 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${501 + i}`),
      ...Array.from({length: 3}, (_, i) => `Laboratorio ${i + 1}`)
    ]
  },
  { numero: 3, descripcion: "Complejo Acuático", espacios: ["Piscina Olímpica"] },
  { numero: 4, descripcion: "Laboratorio de Investigación y Diagnóstico Automotriz - Lida", espacios: ["Lab Motores", "Lab Diagnóstico"] },
  {
    numero: 5,
    descripcion: "Cientic",
    espacios: [
      ...Array.from({length: 7}, (_, i) => `Salón ${101 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${201 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${301 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${401 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${501 + i}`),
      ...Array.from({length: 3}, (_, i) => `Laboratorio ${i + 1}`)
    ]
  },
  {
    numero: 6,
    descripcion: "Académico",
    espacios: [
      ...Array.from({length: 7}, (_, i) => `Salón ${101 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${201 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${301 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${401 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${501 + i}`),
      ...Array.from({length: 3}, (_, i) => `Laboratorio ${i + 1}`)
    ]
  },
  { numero: 7, descripcion: "Bienestar", espacios: [] },
  {
    numero: 8,
    descripcion: "Parque Tech",
    espacios: [
      ...Array.from({length: 7}, (_, i) => `Salón ${101 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${201 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${301 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${401 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${501 + i}`),
      ...Array.from({length: 3}, (_, i) => `Laboratorio ${i + 1}`)
    ]
  },
  {
    numero: 9,
    descripcion: "Laboratorio de Dibujo Técnico y Diseño Asistido por Computador",
    espacios: [
      ...Array.from({length: 7}, (_, i) => `Salón ${101 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${201 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${301 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${401 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${501 + i}`),
      ...Array.from({length: 3}, (_, i) => `Laboratorio ${i + 1}`)
    ]
  },
  {
    numero: 10,
    descripcion: "Procesos Eléctricos",
    espacios: [
      ...Array.from({length: 7}, (_, i) => `Salón ${101 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${201 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${301 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${401 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${501 + i}`),
      ...Array.from({length: 3}, (_, i) => `Laboratorio ${i + 1}`)
    ]
  },
  { numero: 11, descripcion: "Taller de Mecánica Automotriz", espacios: [] },
  { numero: 12, descripcion: "Centro de Investigación y Desarrollo en Procesos de Energía Eléctrica", espacios: [] },
  {
    numero: 13,
    descripcion: "Escuela Pública de Diseño",
    espacios: [
      ...Array.from({length: 7}, (_, i) => `Salón ${101 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${201 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${301 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${401 + i}`),
      ...Array.from({length: 7}, (_, i) => `Salón ${501 + i}`),
      ...Array.from({length: 3}, (_, i) => `Laboratorio ${i + 1}`)
    ]
  },
  { numero: 14, descripcion: "Laboratorio Textil", espacios: [] },
  { numero: 15, descripcion: "Laboratorio de Desarrollo e Investigación en Procesos de Manufactura Avanzada - Dipma", espacios: [] },
  { numero: 16, descripcion: "Imprenta / Laboratorio de Logística Integral y Laboratorio de Química y Física", espacios: [] },
  { numero: 17, descripcion: "Centro de Investigación y Desarrollo en Soldadura - Cides", espacios: [] },
  { numero: 18, descripcion: "Taller de Máquinas y Herramientas Convencionales - Mec", espacios: [] },
  { numero: 19, descripcion: "Centro de Investigación y Desarrollo en Materialografía", espacios: [] },
  { numero: 20, descripcion: "Cancha Sintética de Fútbol", espacios: ["Cancha Sintética"] },
  { numero: 21, descripcion: "Coliseo cubierto", espacios: ["Coliseo Cubierto"] },
  { numero: 22, descripcion: "Gimnasio", espacios: ["Gimnasio"] },
  { numero: 23, descripcion: "Teatro La Convención", espacios: ["Teatro La Convención"] },
  { numero: 24, descripcion: "Biblioteca", espacios: ["Biblioteca"] },
  { numero: 25, descripcion: "Administrativo", espacios: [] },
  { numero: 26, descripcion: "Ciudadela Pedro Nel Gómez", espacios: [] },
  { numero: 27, descripcion: "Zona de comidas y espacios de bienestar", espacios: [] },
];

const MapaReservas = () => {
  const navigate = useNavigate();
  const handleRowClick = (bloque) => {
    navigate(`/seleccion-espacio-horario/${bloque.numero}`);
  };
  return (
    <div className={styles.mapaReservasLayout}>
      <div className={styles.mapaSide}>
          <img
            src="https://pascualbravo.edu.co/wp-content/uploads/2025/01/mapa-del-campus-pascual-bravo.png"
            alt="Mapa Campus Pascual Bravo"
            className={styles.mapaImg + ' ' + styles.mapaFija}
          />
      </div>
      <div className={styles.tablaSide}>
        <h3 className={styles.tablaTitulo}>Bloques y Descripción</h3>
        <table className={styles.tablaBloques}>
          <thead>
            <tr>
              <th>Bloque</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {bloquesCampus.map((bloque) => (
              <tr
                key={bloque.numero}
                className={styles.tablaRowClickable}
                onClick={() => handleRowClick(bloque)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <button
                    className={styles.bloqueBtn}
                    onClick={e => { e.stopPropagation(); handleRowClick(bloque); }}
                  >Bloque {bloque.numero}</button>
                </td>
                <td>{bloque.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MapaReservas;
