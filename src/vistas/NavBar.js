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

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <header className={StyleNav.headerContainer}>
      <div className={StyleNav.header}>
        <img
          src={Logo}
          alt="Logo Pascual"
          className={StyleNav.Logo}
          onClick={() => {
            navigate("/home");
            setIsMenuOpen(false);
          }}
        />

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className={StyleNav.menuToggle}
          onClick={handleMenuClick}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Contenedor del menú */}
        <div
          className={`${StyleNav.navActions} ${
            isMenuOpen ? StyleNav.navMenuOpen : ""
          }`}
        >
          <nav className={StyleNav.navMenu}>
            <a onClick={() => { navigate("/home"); setIsMenuOpen(false); }}>Inicio</a>
            <a onClick={() => { navigate("/nosotros"); setIsMenuOpen(false); }}>Nosotros</a>
            <a onClick={() => { navigate("/contacto"); setIsMenuOpen(false); }}>Contacto</a>

            {userRole === "ROLE_ADMIN" && (
              <>
                <a onClick={() => { navigate("/registro"); setIsMenuOpen(false); }}>Registro</a>
                <a onClick={() => { navigate("/vistareservasgeneral"); setIsMenuOpen(false); }}>BD</a>
              </>
            )}

            {userRole === "ROLE_USER" && (
              <a onClick={() => { navigate("/vistareservas"); setIsMenuOpen(false); }}>
                Mis Reservas
              </a>
            )}

            {isLoggedIn && (
              <a onClick={() => { navigate("/reservas"); setIsMenuOpen(false); }}>
                Reservar
              </a>
            )}
          </nav>

          <div className={StyleNav.navButtons}>
            {!isLoggedIn ? (
              <button onClick={handleLoginRedirect} className={StyleNav.btnLogin}>
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
