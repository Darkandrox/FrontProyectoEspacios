import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./vistas/NavBar";
import ListaLugares from "./vistas/ListaLugares";
import Login from "./vistas/Login"; // componente para la vista de inicio de sesión
import OlvideClave from "./vistas/OlvideClave"; // componente para la vista de recuperación de contraseña
import Inicio from "./vistas/Inicio"; // componente para la vista de inicio
import Nosotros from "./vistas/Nosotros"; // componente para la vista de nosotros
import Contacto from "./vistas/Contacto"; // componente para la vista de contacto


function App() {
  return (
    <Router>
      {/* La Navbar siempre visible */}
      <Navbar />

      {/* Rutas de la aplicación */}
    <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/reservas" element={<ListaLugares />} />
        <Route path="/login" element={<Login />} />
        <Route path="/olvidePass" element={<OlvideClave />} />
        <Route path="/home" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        
      
 
      </Routes>
    </Router>
  );
}

export default App;
