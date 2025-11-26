import React, { useState } from "react";
import { Calendar, Clock, MapPin, Search, ChevronDown, ChevronUp } from "lucide-react";
import StyleLugares from "../styles/ListaLugares.module.css";

const UniversityBookingSystem = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(""); 
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [bookings, setBookings] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  


  const spaces = {
    'Espacios Deportivos': {
    items: [
      { id: 1, block: '20', name: 'Cancha de Fútbol - Campo Principal', capacity: '22 jugadores', room: 'Exterior' },
      { id: 2, block: '20', name: 'Cancha de Fútbol - Campo de Entrenamiento', capacity: '14 jugadores', room: 'Exterior' },
      { id: 3, block: '21', name: 'Coliseo de Baloncesto - Cancha Central', capacity: '500 personas', room: 'Piso 1' },
      { id: 4, block: '21', name: 'Coliseo de Baloncesto - Zona de Graderías', capacity: '300 personas', room: 'Piso 2' },
      { id: 5, block: '23', name: 'Auditorio Principal', capacity: '1000 personas', room: 'Piso 1' },
      { id: 6, block: '23', name: 'Auditorio - Sala de Conferencias A', capacity: '150 personas', room: 'Piso 2' },
      { id: 7, block: '23', name: 'Auditorio - Sala de Conferencias B', capacity: '150 personas', room: 'Piso 2' }
    ]
  },
  'Laboratorios de Sistemas Digitales': {
    items: [
      { id: 8, block: '15', name: 'Lab. de Logística - Aula 101', capacity: '30 personas', room: '101' },
      { id: 9, block: '15', name: 'Lab. de Logística - Aula 102', capacity: '28 personas', room: '102' },
      { id: 10, block: '16', name: 'Lab. de Mecatrónica - Aula 201', capacity: '25 personas', room: '201' },
      { id: 11, block: '16', name: 'Lab. de Mecatrónica - Aula 202', capacity: '25 personas', room: '202' },
      { id: 12, block: '16', name: 'Lab. de Mecatrónica - Aula 203', capacity: '22 personas', room: '203' },
      { id: 13, block: '5', name: 'Lab. de Sistemas Energéticos - Aula 301', capacity: '30 personas', room: '301' },
      { id: 14, block: '5', name: 'Lab. de Sistemas Energéticos - Aula 302', capacity: '28 personas', room: '302' },
      { id: 15, block: '8', name: 'Lab. de Sistemas Sostenibles - Aula 401', capacity: '25 personas', room: '401' },
      { id: 16, block: '8', name: 'Lab. de Sistemas Sostenibles - Aula 402', capacity: '24 personas', room: '402' },
      { id: 17, block: '9', name: 'Lab. de Materiales - Aula 501', capacity: '30 personas', room: '501' },
      { id: 18, block: '9', name: 'Lab. de Materiales - Aula 502', capacity: '26 personas', room: '502' },
      { id: 19, block: '16', name: 'Lab. de Diseño Electrónico - Aula 204', capacity: '25 personas', room: '204' },
      { id: 20, block: '16', name: 'Lab. de Diseño Electrónico - Aula 205', capacity: '24 personas', room: '205' },
      { id: 21, block: '5', name: 'Lab. de Física y Química - Aula 303', capacity: '35 personas', room: '303' },
      { id: 22, block: '5', name: 'Lab. de Física y Química - Aula 304', capacity: '32 personas', room: '304' },
      { id: 23, block: '8', name: 'Lab. de Control Automatizado - Aula 403', capacity: '30 personas', room: '403' },
      { id: 24, block: '8', name: 'Lab. de Control Automatizado - Aula 404', capacity: '28 personas', room: '404' }
    ]
  },
  'Laboratorios de Producción': {
    items: [
      { id: 25, block: '13', name: 'Lab. de Síntesis y Preparación - Aula 601', capacity: '25 personas', room: '601' },
      { id: 26, block: '13', name: 'Lab. de Síntesis y Preparación - Aula 602', capacity: '24 personas', room: '602' },
      { id: 27, block: '16', name: 'Lab. de Logística - Aula 206', capacity: '30 personas', room: '206' },
      { id: 28, block: '16', name: 'Lab. de Logística - Aula 207', capacity: '28 personas', room: '207' },
      { id: 29, block: '6', name: 'Lab. de Procesos Industriales - Aula 701', capacity: '30 personas', room: '701' },
      { id: 30, block: '6', name: 'Lab. de Procesos Industriales - Aula 702', capacity: '28 personas', room: '702' },
      { id: 31, block: '6', name: 'Lab. de Procesos Industriales - Aula 703', capacity: '26 personas', room: '703' },
      { id: 32, block: '8', name: 'Lab. de Logística Integral - Aula 405', capacity: '25 personas', room: '405' },
      { id: 33, block: '8', name: 'Lab. de Logística Integral - Aula 406', capacity: '24 personas', room: '406' },
      { id: 34, block: '13', name: 'Lab. de Simulación de Procesos - Aula 603', capacity: '30 personas', room: '603' },
      { id: 35, block: '13', name: 'Lab. de Simulación de Procesos - Aula 604', capacity: '28 personas', room: '604' }
    ]
  },
  'Laboratorios de Mecánica': {
    items: [
      { id: 36, block: '13', name: 'Lab. Caracterización de Materiales - Aula 605', capacity: '20 personas', room: '605' },
      { id: 37, block: '13', name: 'Lab. Caracterización de Materiales - Aula 606', capacity: '18 personas', room: '606' },
      { id: 38, block: '15', name: 'Lab. Tratamientos Térmicos - Aula 103', capacity: '20 personas', room: '103' },
      { id: 39, block: '15', name: 'Lab. Tratamientos Térmicos - Aula 104', capacity: '18 personas', room: '104' },
      { id: 40, block: '17', name: 'Lab. de Dureza - Aula 801', capacity: '15 personas', room: '801' },
      { id: 41, block: '17', name: 'Lab. de Dureza - Aula 802', capacity: '14 personas', room: '802' },
      { id: 42, block: '18', name: 'Lab. de Fundición - Aula 901', capacity: '20 personas', room: '901' },
      { id: 43, block: '18', name: 'Lab. de Fundición - Aula 902', capacity: '18 personas', room: '902' },
      { id: 44, block: '19', name: 'Lab. de Materialografía - Aula 1001', capacity: '15 personas', room: '1001' },
      { id: 45, block: '19', name: 'Lab. de Materialografía - Aula 1002', capacity: '14 personas', room: '1002' },
      { id: 46, block: '5', name: 'Lab. de Microscopía - Aula 305', capacity: '15 personas', room: '305' },
      { id: 47, block: '5', name: 'Lab. de Microscopía - Aula 306', capacity: '14 personas', room: '306' },
      { id: 48, block: '8', name: 'Lab. Ensayos Destructivos - Aula 407', capacity: '20 personas', room: '407' },
      { id: 49, block: '8', name: 'Lab. Ensayos No Destructivos - Aula 408', capacity: '18 personas', room: '408' },
      { id: 50, block: '13', name: 'Lab. de Soldadura - Aula 607', capacity: '20 personas', room: '607' },
      { id: 51, block: '13', name: 'Lab. de Soldadura - Aula 608', capacity: '18 personas', room: '608' },
      { id: 52, block: '15', name: 'Lab. de Manufactura Mecánica - Aula 105', capacity: '25 personas', room: '105' },
      { id: 53, block: '15', name: 'Lab. de Manufactura Mecánica - Aula 106', capacity: '24 personas', room: '106' },
      { id: 54, block: '17', name: 'Lab. de Aeronáutica - Aula 803', capacity: '20 personas', room: '803' },
      { id: 55, block: '17', name: 'Lab. de Aeronáutica - Aula 804', capacity: '18 personas', room: '804' },
      { id: 56, block: '18', name: 'Lab. de Hidráulica - Aula 903', capacity: '20 personas', room: '903' },
      { id: 57, block: '18', name: 'Lab. de Hidráulica - Aula 904', capacity: '18 personas', room: '904' },
      { id: 58, block: '19', name: 'Lab. de Motos - Aula 1003', capacity: '15 personas', room: '1003' },
      { id: 59, block: '5', name: 'Lab. de Materiales Compuestos - Aula 307', capacity: '20 personas', room: '307' },
      { id: 60, block: '5', name: 'Lab. de Materiales Compuestos - Aula 308', capacity: '18 personas', room: '308' }
    ]
    },
    'Laboratorios de Eléctrica': {
  items: [
    { id: 61, block: '10', name: 'Lab. de Sistemas Energéticos - Aula 1101', capacity: '30 personas', room: '1101' },
    { id: 62, block: '10', name: 'Lab. de Sistemas Energéticos - Aula 1102', capacity: '28 personas', room: '1102' },
    { id: 63, block: '10', name: 'Lab. de Sistemas Energéticos - Aula 1103', capacity: '26 personas', room: '1103' },
    { id: 64, block: '12', name: 'Lab. de PLC - Aula 1201', capacity: '25 personas', room: '1201' },
    { id: 65, block: '12', name: 'Lab. de PLC - Aula 1202', capacity: '24 personas', room: '1202' },
    { id: 66, block: '12', name: 'Lab. de PLC - Aula 1203', capacity: '22 personas', room: '1203' },
    { id: 67, block: '13', name: 'Lab. Simulaciones Eléctricas - Aula 609', capacity: '30 personas', room: '609' },
    { id: 68, block: '13', name: 'Lab. Simulaciones Eléctricas - Aula 610', capacity: '28 personas', room: '610' },
    { id: 69, block: '16', name: 'Lab. Circuitos y Medidas - Aula 208', capacity: '30 personas', room: '208' },
    { id: 70, block: '16', name: 'Lab. Circuitos y Medidas - Aula 209', capacity: '28 personas', room: '209' },
    { id: 71, block: '16', name: 'Lab. Circuitos y Medidas - Aula 210', capacity: '26 personas', room: '210' },
    { id: 72, block: '8', name: 'Lab. Automatización y Control - Aula 409', capacity: '25 personas', room: '409' },
    { id: 73, block: '8', name: 'Lab. Automatización y Control - Aula 410', capacity: '24 personas', room: '410' },
    { id: 74, block: '9', name: 'Lab. de Máquinas Eléctricas - Aula 503', capacity: '30 personas', room: '503' },
    { id: 75, block: '9', name: 'Lab. de Máquinas Eléctricas - Aula 504', capacity: '28 personas', room: '504' },
    { id: 76, block: '9', name: 'Lab. de Máquinas Eléctricas - Aula 505', capacity: '26 personas', room: '505' }
  ]
},

'Laboratorios de Diseño': {
  items: [
    { id: 77, block: '13', name: 'Lab. de Patronaje y Confección - Aula 611', capacity: '25 personas', room: '611' },
    { id: 78, block: '13', name: 'Lab. de Patronaje y Confección - Aula 612', capacity: '24 personas', room: '612' },
    { id: 79, block: '14', name: 'Lab. de Transformación Textil - Aula 1301', capacity: '25 personas', room: '1301' },
    { id: 80, block: '14', name: 'Lab. de Transformación Textil - Aula 1302', capacity: '24 personas', room: '1302' },
    { id: 81, block: '14', name: 'Lab. de Transformación Textil - Aula 1303', capacity: '22 personas', room: '1303' },
    { id: 82, block: '16', name: 'Lab. de Fotografía e Imagen - Aula 211', capacity: '20 personas', room: '211' },
    { id: 83, block: '16', name: 'Lab. de Fotografía e Imagen - Aula 212', capacity: '18 personas', room: '212' },
    { id: 84, block: '6', name: 'Lab. de Diseño Digital - Aula 704', capacity: '30 personas', room: '704' },
    { id: 85, block: '6', name: 'Lab. de Diseño Digital - Aula 705', capacity: '28 personas', room: '705' },
    { id: 86, block: '6', name: 'Lab. de Diseño Digital - Aula 706', capacity: '26 personas', room: '706' }
  ]
},

'Salones y Aulas': {
  items: [
    { id: 87, block: '1', name: 'Salón - Aula 101', capacity: '40 personas', room: '101' },
    { id: 88, block: '1', name: 'Salón - Aula 102', capacity: '38 personas', room: '102' },
    { id: 89, block: '1', name: 'Salón - Aula 103', capacity: '35 personas', room: '103' },
    { id: 90, block: '1', name: 'Salón - Aula 104', capacity: '32 personas', room: '104' },
    { id: 91, block: '1', name: 'Salón - Aula 105', capacity: '30 personas', room: '105' },
    { id: 92, block: '2', name: 'Salón - Aula 201', capacity: '40 personas', room: '201' },
    { id: 93, block: '2', name: 'Salón - Aula 202', capacity: '38 personas', room: '202' },
    { id: 94, block: '2', name: 'Salón - Aula 203', capacity: '35 personas', room: '203' },
    { id: 95, block: '2', name: 'Salón - Aula 204', capacity: '32 personas', room: '204' },
    { id: 96, block: '2', name: 'Salón - Aula 205', capacity: '30 personas', room: '205' },
    { id: 97, block: '3', name: 'Salón - Aula 301', capacity: '40 personas', room: '301' },
    { id: 98, block: '3', name: 'Salón - Aula 302', capacity: '38 personas', room: '302' },
    { id: 99, block: '3', name: 'Salón - Aula 303', capacity: '35 personas', room: '303' },
    { id: 100, block: '3', name: 'Salón - Aula 304', capacity: '32 personas', room: '304' },
    { id: 101, block: '3', name: 'Salón - Aula 305', capacity: '30 personas', room: '305' },
    { id: 102, block: '4', name: 'Salón - Aula 401', capacity: '40 personas', room: '401' },
    { id: 103, block: '4', name: 'Salón - Aula 402', capacity: '38 personas', room: '402' },
    { id: 104, block: '4', name: 'Salón - Aula 403', capacity: '35 personas', room: '403' },
    { id: 105, block: '4', name: 'Salón - Aula 404', capacity: '32 personas', room: '404' },
    { id: 106, block: '4', name: 'Salón - Aula 405', capacity: '30 personas', room: '405' },
    { id: 107, block: '11', name: 'Salón - Aula 1101', capacity: '40 personas', room: '1101' },
    { id: 108, block: '11', name: 'Salón - Aula 1102', capacity: '38 personas', room: '1102' },
    { id: 109, block: '11', name: 'Salón - Aula 1103', capacity: '35 personas', room: '1103' },
    { id: 110, block: '11', name: 'Salón - Aula 1104', capacity: '32 personas', room: '1104' },
    { id: 111, block: '24', name: 'Salón - Aula 2401', capacity: '40 personas', room: '2401' },
    { id: 112, block: '24', name: 'Salón - Aula 2402', capacity: '38 personas', room: '2402' },
    { id: 113, block: '24', name: 'Salón - Aula 2403', capacity: '35 personas', room: '2403' },
    { id: 114, block: '24', name: 'Salón - Aula 2404', capacity: '32 personas', room: '2404' },
    { id: 115, block: '26', name: 'Salón - Aula 2601', capacity: '40 personas', room: '2601' },
    { id: 116, block: '26', name: 'Salón - Aula 2602', capacity: '38 personas', room: '2602' },
    { id: 117, block: '26', name: 'Salón - Aula 2603', capacity: '35 personas', room: '2603' },
    { id: 118, block: '26', name: 'Salón - Aula 2604', capacity: '32 personas', room: '2604' }
  ]
},

'Salas Inteligentes': {
  items: [
    { id: 119, block: '1', name: 'Sala Inteligente - Aula 106', capacity: '50 personas', room: '106' },
    { id: 120, block: '1', name: 'Sala Inteligente - Aula 107', capacity: '45 personas', room: '107' },
    { id: 121, block: '2', name: 'Sala Inteligente - Aula 206', capacity: '50 personas', room: '206' },
    { id: 122, block: '2', name: 'Sala Inteligente - Aula 207', capacity: '45 personas', room: '207' },
    { id: 123, block: '3', name: 'Sala Inteligente - Aula 306', capacity: '50 personas', room: '306' },
    { id: 124, block: '3', name: 'Sala Inteligente - Aula 307', capacity: '45 personas', room: '307' },
    { id: 125, block: '4', name: 'Sala Inteligente - Aula 406', capacity: '50 personas', room: '406' },
    { id: 126, block: '4', name: 'Sala Inteligente - Aula 407', capacity: '45 personas', room: '407' },
    { id: 127, block: '11', name: 'Sala Inteligente - Aula 1105', capacity: '50 personas', room: '1105' },
    { id: 128, block: '11', name: 'Sala Inteligente - Aula 1106', capacity: '45 personas', room: '1106' }
  ]
}
    
  };

  const timeSlots = [
    "07:00","08:00","09:00","10:00","11:00",
    "12:00","13:00","14:00","15:00","16:00","17:00"
  ];

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

const handleBooking = async () => {
  const token = localStorage.getItem("token");
  const API_URL = `${API_BASE_URL}/api/reservas`;

  if (!selectedSpace || !selectedDate || !selectedTime || !selectedTimeEnd) {
    alert("Por favor, completa todos los campos antes de reservar.");
    return;
  }

  const reserva = {
    espacioId: selectedSpace.id,
    fecha: selectedDate,
    horaInicio: selectedTime,
    horaFin: selectedTimeEnd,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}` 
      },
      body: JSON.stringify(reserva),
    });

    // Evita intentar leer JSON si el servidor responde vacío
    let data = null;
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (response.ok) {
      console.log("Reserva creada:");

      const nuevaReserva = {
        id: data.reserva?.id || Date.now(),
        space: data.reserva?.espacio?.nombre || selectedSpace.nombre,
        date: data.reserva?.fecha || selectedDate,
        time: `${data.reserva?.horaInicio || selectedTime} - ${data.reserva?.horaFin || selectedTimeEnd}`,
      };

      setBookings((prev) => [...prev, nuevaReserva]);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 15000);

      // Limpia los campos del formulario
      setSelectedSpace("");
      setSelectedDate("");
      setSelectedTime("");
      setSelectedTimeEnd("");
    } else if (response.status === 403) {
      alert("No tienes permiso para realizar esta acción. Inicia sesión nuevamente.");
    } else {
      alert(data.error || "Error desconocido al crear la reserva");
    }
  } catch (err) {
    console.error("Error de conexión:", err);
    alert("No se pudo conectar con el servidor.");
  }
};

  const filteredSpaces = Object.entries(spaces).reduce((acc, [category, data]) => {
    const filtered = data.items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.block.includes(searchTerm) ||
      item.room.includes(searchTerm)
    );
    if (filtered.length > 0) acc[category] = { ...data, items: filtered };
    return acc;
  }, {});

  return (
    <div className={StyleLugares.mainContainer}>
      <header className={StyleLugares.header}>
        <h1 className={StyleLugares.title}>Sistema de Reservas Universitarias</h1>
        <p className={StyleLugares.subtitle}>Gestión de espacios académicos</p>
      </header>

      <section className={StyleLugares.sectionContainer}>
        {showSuccess && (
          <div className={StyleLugares.successMessage}>
            ✓ Reserva realizada exitosamente
          </div>
        )}

        <div className={StyleLugares.gridContainer}>
          {/* Lista de espacios */}
          <div className={StyleLugares.spaceList}>
            <div className={StyleLugares.searchContainer}>
              <Search className={StyleLugares.iconSearch} size={20} />
              <input
                type="text"
                placeholder="Buscar por nombre, bloque o aula..."
                className={StyleLugares.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {Object.entries(filteredSpaces).map(([category, data]) => (
              <div key={category} className={StyleLugares.categoryCard}>
                <button
                  onClick={() => toggleCategory(category)}
                  className={StyleLugares.categoryHeader}
                >
                  <div className={StyleLugares.categoryInfo}>
                    <span className={StyleLugares.categoryIcon}>{data.icon}</span>
                    <span className={StyleLugares.categoryTitle}>{category}</span>
                    <span className={StyleLugares.categoryCount}>
                      ({data.items.length})
                    </span>
                  </div>
                  {expandedCategories[category] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {expandedCategories[category] && (
                  <div className={StyleLugares.spaceGrid}>
                    {data.items.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedSpace(item);
                          setSelectedBlock(item.block);
                          setSelectedCategory(category);
                        }}
                        className={`${StyleLugares.spaceItem} ${
                          selectedSpace?.id === item.id ? StyleLugares.active : ""
                        }`}
                      >
                        <div className={StyleLugares.spaceHeader}>
                          <span className={StyleLugares.spaceName}>{item.name}</span>
                          <span className={StyleLugares.spaceBlock}>Bloque {item.block}</span>
                        </div>
                        <p className={StyleLugares.spaceDetails}>{item.capacity}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Panel lateral */}
          <aside className={StyleLugares.sidebar}>
            <h2 className={StyleLugares.sidebarTitle}>Detalles de Reserva</h2>

            <div className={StyleLugares.infoBox}>
              <div className={StyleLugares.infoHeader}>
                <MapPin size={18} />
                <span>Espacio Seleccionado</span>
              </div>
              {selectedSpace ? (
                <div>
                  <p className={StyleLugares.infoText}>{selectedSpace.name}</p>
                  <p className={StyleLugares.infoSubText}>Bloque {selectedBlock}</p>
                </div>
              ) : (
                <p className={StyleLugares.placeholderText}>Ningún espacio seleccionado</p>
              )}
            </div>

            <label className={StyleLugares.label}>
              <Calendar size={18} /> Fecha
            </label>
            <input
              type="date"
              className={StyleLugares.input}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />

            <label className={StyleLugares.label}>
              <Clock size={18} /> Hora Inicio
            </label>
            <select
              className={StyleLugares.input}
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Seleccionar hora</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>

            <label className={StyleLugares.label}>
              <Clock size={18} /> Hora Fin
            </label>
            <select
              className={StyleLugares.input}
              value={selectedTimeEnd}
              onChange={(e) => setSelectedTimeEnd(e.target.value)}
            >
              <option value="">Seleccionar hora</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>

            <button
              onClick={handleBooking}
              disabled={!selectedSpace || !selectedDate || !selectedTime || !selectedTimeEnd}
              className={`${StyleLugares.btnReserva} ${
                !selectedSpace || !selectedDate || !selectedTime || !selectedTimeEnd ? StyleLugares.disabled : ""
              }`}
            >
              Confirmar Reserva
            </button>

            {bookings.length > 0 && (
              <div className={StyleLugares.reservasBox}>
                <h3>Mis Reservas ({bookings.length})</h3>
                {bookings.map((booking) => (
                  <div key={booking.id} className={StyleLugares.reservaItem}>
                    <p>{booking.space}</p>
                    <p>{booking.date} • {booking.time}</p>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
};

export default UniversityBookingSystem;