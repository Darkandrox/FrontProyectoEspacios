import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StyleNav from "../styles/NavBar.module.css";
import Logo from "../assets/pascualogohorizontal.png";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Revisa el token cada vez que cambia
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Verifica al montar
    checkLogin();

    // Listener de cambios en localStorage (para cuando se loguea en otra pestaña)
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleMenuClick = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Actualiza la barra inmediatamente
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
          <a onClick={() => navigate("/nosotros")}>Contacto</a>
          <a onClick={() => navigate("/contacto")}>Nosotros</a>
          {isLoggedIn && <a onClick={() => navigate("/reservas")}>Reservas</a>}

          {!isLoggedIn ? (
            <button
              onClick={handleLoginRedirect}
              className={StyleNav.btnLogin}
            >
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

