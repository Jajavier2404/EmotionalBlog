import React from 'react';
import fondo from '../../assets/video/login.mp4';
import useAuthForm from '../hooks/useAuthForm';
import Modal from '../components/Modal';
import SocialContainer from '../components/SocialContainer';
import '../styles/login.css'; // Import the CSS file

const SlidingAuthForm: React.FC = () => {
  const {
    isRightPanelActive,
    setIsRightPanelActive,
    isSubmitting,
    loginData,
    setLoginData,
    registerData,
    setRegisterData,
    modal,
    hideModal,
    handleRegister,
    handleLogin,
  } = useAuthForm();

  return (
    <div className="app-container">
      <div className={`sliding-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>

        {/* Formulario de Iniciar Sesión */}
        <div className="form-container sign-in-container">
          <div className="form-panel">
            <div className="form-content">
              <h1 className="main-heading">Iniciar Sesión</h1>
              <SocialContainer />
              <span className="sub-text">o usa tu cuenta</span>
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={loginData.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginData({...loginData, username: e.target.value})}
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={loginData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginData({...loginData, email: e.target.value})}
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={loginData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginData({...loginData, password: e.target.value})}
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              <div className="login-button-container">
                <button onClick={handleLogin} disabled={isSubmitting} className="auth-button">
                  {isSubmitting ? 'Verificando...' : 'Iniciar Sesión'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Registro */}
        <div className="form-container sign-up-container">
          <div className="form-panel">
            <div className="form-content">
              <h1 className="main-heading">Regístrate Aquí</h1>
              <SocialContainer />
              <span className="sub-text">o crea tu cuenta</span>
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={registerData.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterData({...registerData, username: e.target.value})}
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={registerData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterData({...registerData, email: e.target.value})}
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={registerData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterData({...registerData, password: e.target.value})}
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              <button onClick={handleRegister} disabled={isSubmitting} className="auth-button register-button">
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <video autoPlay loop muted playsInline className="background-video">
              <source src={fondo} type="video/mp4" />
              Tu navegador no soporta la etiqueta de video.
            </video>
            <div className="overlay-panel overlay-left">
              <h1 className="overlay-text-large">¡Bienvenido de nuevo!</h1>
              <p className="overlay-text-small">Para seguir conectado con nosotros, por favor inicia sesión con tus datos</p>
              <button className="auth-button ghost-button" onClick={() => setIsRightPanelActive(false)}>Iniciar Sesión</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="overlay-text-large">¡Hola, Amigo!</h1>
              <p className="overlay-text-small">Ingresa tus datos personales y comienza tu aventura con nosotros</p>
              <button className="auth-button ghost-button" onClick={() => setIsRightPanelActive(true)}>Registrarse</button>
            </div>
          </div>
        </div>
      </div>

      <Modal modal={modal} hideModal={hideModal} />
    </div>
  );
};

export default SlidingAuthForm;