import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => (
  <section id="hero">
    <div className="part_1">
      <h1 className="title">Humanizando las emociones</h1>
      <p>
        Bienvenido a <strong>Emotional Blog</strong>, un espacio donde compartimos experiencias, reflexiones y consejos sobre el mundo emocional. Conéctate contigo mismo y con los demás a través de historias reales.
      </p>
      <Link to="/login"><button className="btn btn2">Comenzar ahora</button></Link>
    </div>
    <div className="part_2"></div>
    <div className="patterns">
      <div className="intro-left"></div>
      <div className="intro-right"></div>
    </div>
  </section>
);

export default Hero;
