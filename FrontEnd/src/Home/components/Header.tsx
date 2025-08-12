import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logo, iconClose, iconHamburger } from "../assets/images/index";

interface HeaderProps {
  menuActive: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

interface UserPayload {
  username: string;
  // Agrega aquí otras propiedades del payload que necesites
}

const Header: React.FC<HeaderProps> = ({ menuActive, openMenu, closeMenu }) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode<UserPayload>(token);
          setUser(decodedToken);
        } catch (error) {
          console.error("Error decoding token:", error);
          setUser(null);
          localStorage.removeItem("token");
        }
      } else {
        setUser(null);
      }
    };

    // Ejecutar al montar y cada vez que el storage cambie
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);

    // Limpieza del listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage")); // Avisa que el storage cambió
    navigate("/");
  };

  return (
    <header id="header">
      <div className="part_1">
        <img src={logo} alt="Logo Emotional Blog" className="logo" />
      </div>

      <div className={`part_2 menu_part ${menuActive ? "active" : ""}`}>
        <nav>
          <li><Link to="/">Quiénes somos</Link></li>
          <li>< Link to="/blog">Blog Personal</Link></li>
          {user ? (
            <li className="user-info">
              <span>{user.username}</span>
              <button onClick={handleLogout} className="btn">Cerrar Sesión</button>
            </li>
          ) : (
            <>
              <li><Link to="/login">Iniciar sesión</Link></li>
              <Link to="/login"><button className="btn">Entrar al Blog</button></Link>
            </>
          )}
        </nav>
      </div>

      <div className="mobile_menu">
        {menuActive ? (
          <p onClick={closeMenu}><img src={iconClose} alt="Cerrar menú" /></p>
        ) : (
          <p onClick={openMenu}><img src={iconHamburger} alt="Abrir menú" /></p>
        )}
      </div>
    </header>
  );
};

export default Header;
