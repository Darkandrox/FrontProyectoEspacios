import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/SeleccionEspacioHorario.module.css";

// Reutilizamos la lista de bloques para obtener los espacios
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

const horas = Array.from({length: 16}, (_, i) => {
  const h1 = 6 + i;
  const h2 = h1 + 1;
  return `${h1}:00 - ${h2}:00`;
});

// Simulación de horarios ocupados por salón/laboratorio
const horariosOcupadosDemo = {
  "Salón 101": ["8:00 - 9:00", "10:00 - 11:00"],
  "Laboratorio 1": ["7:00 - 8:00", "15:00 - 16:00"],
  // Puedes agregar más ejemplos aquí
};
const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

const SeleccionEspacioHorario = () => {
  const { numero } = useParams();
  const navigate = useNavigate();
  const bloque = bloquesCampus.find(b => b.numero === Number(numero));
  const [espacio, setEspacio] = useState("");
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [filtro, setFiltro] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  if (!bloque) return <div>Bloque no encontrado</div>;


  // Filtrar espacios según el filtro
    const espaciosFiltrados = bloque.espacios.filter(e => {
      if (!filtro) return true;
      const texto = filtro.toLowerCase();
      // Permite buscar por "salón", "laboratorio", número, nombre parcial, etc.
      return e.toLowerCase().includes(texto) ||
        (texto.includes("salon") && e.toLowerCase().includes("salón")) ||
        (texto.includes("laboratorio") && e.toLowerCase().includes("laboratorio")) ||
        (texto.match(/\d+/) && e.match(/\d+/) && e.includes(texto.match(/\d+/)[0]));
    });

  // Calcular horarios disponibles según el espacio seleccionado
  let horariosDisponibles = horas;
  if (espacio && horariosOcupadosDemo[espacio]) {
    horariosDisponibles = horas.filter(h => !horariosOcupadosDemo[espacio].includes(h));
  }

  const handleReservar = () => {
    alert(`Reserva realizada para ${espacio} el ${dia} en el horario ${hora}`);
    navigate("/reservas");
  };

  return (
    <div className={styles.seleccionEspacioHorarioPage}>
      <h2>Reservar en Bloque {bloque.numero} - {bloque.descripcion}</h2>
      <div className={styles.seleccionHorarioGrid}>
        {/* Filtros y selects a la izquierda */}
        <div className={styles.filtrosCol}>
          <div>
            <label>Filtrar salón/laboratorio:</label>
            <input
            type="text"
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            placeholder="Buscar por nombre, número o tipo..."
            />
          </div>
          <div>
            <label>Espacio:</label>
            <select value={espacio} onChange={e => setEspacio(e.target.value)}>
              <option value="">-- Selecciona salón o laboratorio --</option>
              {espaciosFiltrados.map((esp, idx) => (
                <option key={idx} value={esp}>{esp}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Día:</label>
            <select value={dia} onChange={e => setDia(e.target.value)}>
              <option value="">-- Selecciona día --</option>
              {dias.map((d, idx) => (
                <option key={idx} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Horario:</label>
            <select value={hora} onChange={e => setHora(e.target.value)}>
              <option value="">-- Selecciona horario --</option>
              {horariosDisponibles.map((h, idx) => (
                <option key={idx} value={h}>{h}</option>
              ))}
            </select>
            {espacio && horariosOcupadosDemo[espacio] && (
              <div className={styles.smallWarning}>
                <small>Horarios ocupados: {horariosOcupadosDemo[espacio].join(", ")}</small>
              </div>
            )}
          </div>
          <button
            className={styles.bloqueBtn}
            disabled={!espacio || !dia || !hora}
            onClick={() => setShowConfirm(true)}
          >Reservar</button>
          <button className={styles.btnCerrarModal} onClick={() => navigate("/reservas")}>Volver</button>
        </div>
        {/* Imagen interactiva a la derecha */}
        <div className={styles.imagenCol}>
            {espacio && espacio.toLowerCase().includes("salón") ? (
              <div className={styles.imagenesSalonesGrid}>
                {(() => {
                  const imagenesBase = [
                    "https://pascualbravo.edu.co/comunicaciones/images/medios/2015/pascual-bravo-medellin.jpg",
                    "https://pascualbravo.edu.co/wp-content/uploads/2024/06/talleres-de-juicio-pascual-bravo-2-2048x1365.jpg",
                    "https://pascualbravo.edu.co/wp-content/uploads/2020/08/docentes-1024x511.jpg"
                  ];
                  const idx = espaciosFiltrados.findIndex(e => e === espacio);
                  return (
                    <img
                      src={imagenesBase[idx % imagenesBase.length]}
                      alt={`Imagen salón ${espacio}`}
                      className={styles.imagenInteractiva}
                    />
                  );
                })()}
              </div>
            ) : espacio && espacio.toLowerCase().includes("laboratorio") ? (
              <div className={styles.imagenesSalonesGrid}>
                {(() => {
                  const imagenesLab = [
                    "https://pascualbravo.edu.co/wp-content/uploads/2020/04/laboratorio5-1024x507.jpg",
                    "https://pascualbravo.edu.co/wp-content/uploads/2020/04/laboratorio1-1024x507.jpg",
                    "https://pascualbravo.edu.co/wp-content/uploads/2020/05/laboratorio-logistica1.jpg",
                    "https://pascualbravo.edu.co/wp-content/uploads/2025/01/laboratorio-diseno-electronico-y-control-pascual-bravo-2.png"
                  ];
                  const idx = espaciosFiltrados.findIndex(e => e === espacio);
                  return (
                    <img
                      src={imagenesLab[idx % imagenesLab.length]}
                      alt={`Imagen laboratorio ${espacio}`}
                      className={styles.imagenInteractiva}
                    />
                  );
                })()}
              </div>
            ) : (
              <img src="https://pascualbravo.edu.co/wp-content/uploads/2022/05/cultura.png" alt="Logo Pascual Bravo" className={styles.imagenInteractiva} />
            )}
        </div>
      </div>
      {/* Mensaje de confirmación de reserva */}
      {showConfirm && (
        <div className={styles.confirmacionReservaModal}>
          <div className={styles.confirmacionReservaBox}>
            <h3>¡Reserva confirmada!</h3>
            <p><b>Bloque:</b> {bloque.numero} - {bloque.descripcion}</p>
            <p><b>Espacio:</b> {espacio}</p>
            <p><b>Día:</b> {dia}</p>
            <p><b>Horario:</b> {hora}</p>
            <button onClick={() => { setShowConfirm(false); navigate("/reservas"); }} className={styles.btnCerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeleccionEspacioHorario;
