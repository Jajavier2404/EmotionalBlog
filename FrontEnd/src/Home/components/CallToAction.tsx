import React from "react";
import { Link } from "react-router-dom";

const CallToAction: React.FC = () => (
  <section id="content_2">
    <div className="part_1">
      <h2>Descubre más sobre nuestra comunidad</h2>
    </div>
    <div className="pattern-right"></div>
    <div className="part_2">
      <Link to="/login"><button className="btn btn2">Únete ahora</button></Link>
    </div>
  </section>
);

export default CallToAction;
