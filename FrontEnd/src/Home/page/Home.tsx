import React, { useState } from "react";
import "../styles/home.css";
import {Header, Footer , Hero, CallToAction, Features} from "../components/index";


const LandingPage: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);
  const openMenu = () => setMenuActive(true);
  const closeMenu = () => setMenuActive(false);

  return (
    <main>
      <Header menuActive={menuActive} openMenu={openMenu} closeMenu={closeMenu} />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </main>
  );
};

export default LandingPage;
