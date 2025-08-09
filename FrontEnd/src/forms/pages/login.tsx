import React, { useState, useEffect } from "react";
import SlidingAuthForm from "./loginPC/login";
import MobileAuthForm from "./loginMOVIL/login";

// Hook personalizado para detectar el tamaño de pantalla
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      

      // Detectar dispositivos móviles por tamaño de pantalla
      const isMobileBySize = width <= 768;

      // Detectar dispositivos móviles por user agent (opcional, más preciso)
      const isMobileByUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      // Detectar dispositivos táctiles
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Combinación de factores para determinar si es móvil
      const isMobileDevice = isMobileBySize || (isMobileByUserAgent && isTouchDevice);

      setIsMobile(isMobileDevice);
      setIsLoading(false);
    };

    // Verificar al cargar
    checkDevice();

    // Verificar al redimensionar la ventana
    const handleResize = () => {
      checkDevice();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, isLoading };
};

// Componente de loading mientras se determina el dispositivo
const LoadingScreen: React.FC = () => (
  <div className="responsive-auth-loading">
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Cargando...</p>
    </div>
  </div>
);

// Componente principal responsivo
const ResponsiveAuthForm: React.FC = () => {
  const { isMobile, isLoading } = useDeviceDetection();

  // Mostrar loading mientras se determina el dispositivo
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Renderizar el componente apropiado
  return (
    <>
      {isMobile ? <MobileAuthForm /> : <SlidingAuthForm />}
    </>
  );
};

export default ResponsiveAuthForm;
