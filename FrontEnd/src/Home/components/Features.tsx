import React from "react";
import { iconSnappyProcess, iconAffordablePrices, iconPeopleFirst } from "../assets/images/index";

const Features: React.FC = () => (
  <section id="content_1">
    <div className="part_1">
      <h2>Por qué somos diferentes</h2>
    </div>
    <div className="part_2">
      <div className="box">
        <img src={iconSnappyProcess} alt="Proceso rápido" />
        <h3>Registro rápido</h3>
        <p>Únete en minutos y empieza a leer y compartir historias emocionales sin complicaciones.</p>
      </div>
      <div className="box">
        <img src={iconAffordablePrices} alt="Accesible" />
        <h3>Acceso gratuito</h3>
        <p>Nuestro contenido es abierto para todos, porque las emociones son de todos.</p>
      </div>
      <div className="box">
        <img src={iconPeopleFirst} alt="Personas primero" />
        <h3>Personas primero</h3>
        <p>Aquí lo más importante es tu voz y tu historia. Creamos un espacio seguro para expresarte.</p>
      </div>
    </div>
  </section>
);

export default Features;
