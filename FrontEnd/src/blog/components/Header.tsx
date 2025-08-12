import React from "react";
import { Link } from "react-router-dom";
import { logo, iconClose, iconHamburger } from "../../Home/assets/images";

interface HeaderProps {
  menuActive: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ menuActive, openMenu, closeMenu }) => (
  <header id="header">
    <div className="part_1">
      <img src={logo} alt="Logo Emotional Blog" className="logo" />
    </div>

    <div className={`part_2 menu_part ${menuActive ? "active" : ""}`}>
      <nav>
        <li><a href="#">Quiénes somos</a></li>
        <li><a href="#">Historias</a></li>
        <li><Link to="/login">Iniciar sesión</Link></li>
        <Link to="/blog"><button className="btn">Entrar al Blog</button></Link>
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

export default Header;
