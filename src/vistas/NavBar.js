import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // 👈 Instala con: npm install jwt-decode
import StyleNav from "../styles/NavBar.module.css";
import Logo from "../assets/pascualogohorizontal.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // ✅ Revisa token y rol al cargar o cambiar
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
          console.error("Error al decodificar el token:", error);
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

  const handleMenuClick = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  const handleLoginRedirect = () => {
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

        <button
          className={StyleNav.menuToggle}
          onClick={handleMenuClick}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav
          className={`${StyleNav.navMenu} ${
            isMenuOpen ? StyleNav.navMenuOpen : ""
          }`}
        >
          <a onClick={() => navigate("/home")}>Inicio</a>
          <a onClick={() => navigate("/nosotros")}>Nosotros</a>
          <a onClick={() => navigate("/contacto")}>Contacto</a>
          

          {/* ✅ Solo visible para administradores */}
          {userRole === "ROLE_ADMIN" && (
            <>
              <a onClick={() => navigate("/registro")}>Registro</a>
              <a onClick={() => navigate("/vistareservasgeneral")}>BD</a>
            </>
          )}

          {userRole === "ROLE_USER" && (
            <>
              <a onClick={() => navigate("/vistareservas")}>Mis Reservas</a>
            </>
          )}

          {/* ✅ Solo visible para usuarios logueados */}
          {isLoggedIn && <a onClick={() => navigate("/reservas")}>Reservar</a>}

          {!isLoggedIn ? (
            <button onClick={handleLoginRedirect} className={StyleNav.btnLogin}>
              Iniciar Sesión
            </button>
          ) : (
            <button onClick={handleLogout} className={StyleNav.btnLogout}>
              Cerrar Sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
