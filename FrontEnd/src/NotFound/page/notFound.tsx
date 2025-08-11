import React, { useEffect, useState } from 'react';
import '../style/notFound.css';
const NotFound: React.FC = () => {
  const [countdown, setCountdown] = useState(10);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to home page
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.length > 1 ? window.history.back() : (window.location.href = '/');
  };

  return (
    <div className="notfound-container">
      {/* Animated background particles */}
      <div className="notfound-bg-particles"></div>
      <div className="notfound-bg-grid"></div>

      <div className={`notfound-content ${isVisible ? 'visible' : ''}`}>
        {/* Floating 404 with glitch effect */}
        <div className="notfound-404">
          <div className="glitch-container">
            <div className="glitch" data-text="404">404</div>
            <div className="glitch glitch-1" data-text="404">404</div>
            <div className="glitch glitch-2" data-text="404">404</div>
          </div>
        </div>

        {/* Animated spaceship/UFO */}
        <div className="floating-spaceship">
          <div className="spaceship">
            <div className="spaceship-body"></div>
            <div className="spaceship-dome"></div>
            <div className="spaceship-light light-1"></div>
            <div className="spaceship-light light-2"></div>
            <div className="spaceship-light light-3"></div>
            <div className="spaceship-beam"></div>
          </div>
        </div>

        {/* Main content */}
        <div className="notfound-text">
          <h1 className="notfound-title">Página No Encontrada</h1>
          <p className="notfound-subtitle">
            Parece que te has perdido en el espacio digital.
            La página que buscas no existe en esta dimensión.
          </p>
        </div>

        {/* Floating elements */}
        <div className="floating-elements">
          <div className="floating-item item-1">🌟</div>
          <div className="floating-item item-2">🚀</div>
          <div className="floating-item item-3">🌙</div>
          <div className="floating-item item-4">⭐</div>
          <div className="floating-item item-5">🛸</div>
        </div>

        {/* Action buttons */}
        <div className="notfound-actions">
          <button onClick={handleGoHome} className="notfound-btn primary">
            <span className="btn-icon"></span>
            Ir al Inicio
          </button>
          <button onClick={handleGoBack} className="notfound-btn secondary">
            <span className="btn-icon"></span>
            Regresar
          </button>
        </div>

        {/* Countdown timer */}
        <div className="countdown-container">
          <div className="countdown-circle">
            <svg className="countdown-svg" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(139, 92, 246, 0.2)"
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="282.7"
                strokeDashoffset={282.7 - (282.7 * (10 - countdown)) / 10}
                className="countdown-progress"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="countdown-number">{countdown}</div>
          </div>
          <p className="countdown-text">
            Redirigiendo automáticamente en {countdown} segundo{countdown !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Suggestions */}
        <div className="suggestions">
          <h3 className="suggestions-title">¿Qué puedes hacer?</h3>
          <ul className="suggestions-list">
            <li>Verificar la URL en la barra de direcciones</li>
            <li>Usar el botón de navegación del navegador</li>
            <li>Buscar desde la página principal</li>
            <li>Contactar soporte si el problema persiste</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
