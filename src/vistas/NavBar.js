import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import StyleNav from "../styles/NavBar.module.css";
import Logo from "../assets/pascualogohorizontal.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const role = decoded.role || decoded["role"];
          setUserRole(role);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error al decodificar token:", error);
          setIsLoggedIn(false);
          setUserRole(null);
        }
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  return (
    <header className={StyleNav.headerContainer}>
      <div className={StyleNav.header}>
        <img
          src={Logo}
          alt="Logo Pascual"
          className={StyleNav.Logo}
          onClick={() => navigate("/home")}
        />

        {/* Botón hamburguesa */}
        <button
          className={StyleNav.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Overlay para cerrar al tocar afuera */}
        {isMenuOpen && <div className={StyleNav.overlay} onClick={toggleMenu}></div>}

        {/* Contenedor menú */}
        <div
          className={`${StyleNav.navActions} ${
            isMenuOpen ? StyleNav.navMenuOpen : ""
          }`}
        >
          <nav className={StyleNav.navMenu}>
            <a onClick={() => navigate("/home")}>Inicio</a>
            <a onClick={() => navigate("/nosotros")}>Nosotros</a>
            <a onClick={() => navigate("/contacto")}>Contacto</a>

            {userRole === "ROLE_ADMIN" && (
              <>
                <a onClick={() => navigate("/registro")}>Registro</a>
                <a onClick={() => navigate("/vistareservasgeneral")}>BD</a>
              </>
            )}

            {userRole === "ROLE_USER" && (
              <a onClick={() => navigate("/vistareservas")}>Mis Reservas</a>
            )}

            {isLoggedIn && (
              <a onClick={() => navigate("/reservas")}>Reservar</a>
            )}
          </nav>

          <div className={StyleNav.navButtons}>
            {!isLoggedIn ? (
              <button onClick={() => navigate("/login")} className={StyleNav.btnLogin}>
                Iniciar Sesión
              </button>
            ) : (
              <button onClick={handleLogout} className={StyleNav.btnLogout}>
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
