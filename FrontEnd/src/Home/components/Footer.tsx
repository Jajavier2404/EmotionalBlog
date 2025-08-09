import React from "react";
import { Link } from "react-router-dom";
import { logo, iconFacebook, iconTwitter, iconPinterest, iconInstagram } from "../assets/images/index";

const Footer: React.FC = () => (
  <footer id="footer">
    <div className="pattern"></div>
    <div className="part_1">
      <div className="logo_part">
        <img src={logo} alt="Logo Emotional Blog" />
      </div>
      <div className="social">
        <ul>
          <li><a href="#"><img src={iconFacebook} alt="Facebook" /></a></li>
          <li><a href="#"><img src={iconTwitter} alt="Twitter" /></a></li>
          <li><a href="#"><img src={iconPinterest} alt="Pinterest" /></a></li>
          <li><a href="#"><img src={iconInstagram} alt="Instagram" /></a></li>
        </ul>
      </div>
    </div>

    <div className="part_2">
      <div className="box">
        <h3>Nuestra comunidad</h3>
        <ul>
          <li><a href="#">Quiénes somos</a></li>
          <li><a href="#">Nuestra misión</a></li>
          <li><Link to="/login">Entrar al blog</Link></li>
          <li><a href="#">Historias destacadas</a></li>
        </ul>
      </div>

      <div className="box">
        <h3>Ayuda</h3>
        <ul>
          <li><a href="#">Preguntas frecuentes</a></li>
          <li><a href="#">Términos de uso</a></li>
          <li><a href="#">Política de privacidad</a></li>
          <li><a href="#">Cookies</a></li>
        </ul>
      </div>

      <div className="box">
        <h3>Contacto</h3>
        <ul>
          <li><a href="#">Soporte</a></li>
          <li><a href="#">Correo</a></li>
          <li><a href="#">Chat en vivo</a></li>
        </ul>
      </div>

      <div className="box">
        <h3>Otros</h3>
        <ul>
          <li><a href="#">Colabora</a></li>
          <li><a href="#">Prensa</a></li>
          <li><a href="#">Licencias</a></li>
        </ul>
      </div>
    </div>

    <div className="coder">
      <small>
        Creado por{" "}
        <a
          href="https://github.com/Jajavier2404/EmotionalBlog"
          target="_blank"
          title="repositorio EmotionalBlog"
          rel="noreferrer"
        >
          Albarracín - Javier Gomez
        </a>
      </small>
    </div>
  </footer>
);

export default Footer;
