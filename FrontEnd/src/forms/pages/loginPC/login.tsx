import React, { useState } from "react";
import fondo from "../../../assets/video/login.mp4";
import useAuthForm from "../../hooks/useAuthForm";
import Modal from "../../components/Modal";
import SocialContainer from "../../components/SocialContainer";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";

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
    showForgotPassword,
    setShowForgotPassword,
    forgotPasswordEmail,
    setForgotPasswordEmail,
    handleForgotPassword,
  } = useAuthForm();

  // Estados para mostrar/ocultar contraseñas
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };

  // Función para obtener el color de la fortaleza de la contraseña
  const getPasswordStrengthColor = (password: string) => {
    if (password.length < 6) return "#ef4444"; // Rojo
    if (password.length < 10) return "#f59e0b"; // Ámbar
    return "#10b981"; // Verde
  };

  // Función para obtener el texto de la fortaleza
  const getPasswordStrengthText = (password: string) => {
    if (password.length < 6) return "Débil";
    if (password.length < 10) return "Media";
    return "Fuerte";
  };

  // Función para prevenir copia en el campo de registro
  const handleRegisterPasswordKeyDown = (e: React.KeyboardEvent) => {
    // Prevenir Ctrl+C, Ctrl+A, Ctrl+X
    if (e.ctrlKey && (e.key === "c" || e.key === "a" || e.key === "x")) {
      e.preventDefault();
    }
  };

  const handleRegisterPasswordContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir menú contextual (click derecho)
  };

  return (
    <div className="app-container">
      <button
        className="home-button"
        onClick={handleGoHome}
        title="Ir al inicio"
      >
        <i className="fas fa-home"></i>
      </button>
      <div
        className={`sliding-container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        {/* Formulario de Iniciar Sesión */}
        <div className="form-container sign-in-container">
          <div className="form-panel">
            <div className="form-content">
              {!showForgotPassword ? (
                <>
                  <h1 className="main-heading">Iniciar Sesión</h1>
                  <SocialContainer />
                  <span className="sub-text">o usa tu cuenta</span>
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={loginData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                    className="auth-input"
                    disabled={isSubmitting}
                  />

                  {/* Campo de contraseña con botón de mostrar/ocultar */}
                  <div
                    className="password-input-container"
                    style={{ position: "relative", width: "100%" }}
                  >
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      value={loginData.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                      className="auth-input"
                      disabled={isSubmitting}
                      style={{ paddingRight: "45px" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="password-toggle-btn"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#666",
                        fontSize: "16px",
                      }}
                      disabled={isSubmitting}
                    >
                      <i
                        className={
                          showLoginPassword ? "fas fa-eye-slash" : "fas fa-eye"
                        }
                      ></i>
                    </button>
                  </div>

                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() => setShowForgotPassword(true)}
                    disabled={isSubmitting}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>

                  <div className="login-button-container">
                    <button
                      onClick={handleLogin}
                      disabled={isSubmitting}
                      className="auth-button"
                    >
                      {isSubmitting ? "Verificando..." : "Iniciar Sesión"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="main-heading">Recuperar Contraseña</h1>
                  <span className="sub-text">
                    Ingresa tu correo electrónico y te enviaremos un enlace para
                    restablecer tu contraseña
                  </span>
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={forgotPasswordEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForgotPasswordEmail(e.target.value)
                    }
                    required
                    className="auth-input"
                    disabled={isSubmitting}
                  />

                  <div className="forgot-password-buttons">
                    <button
                      onClick={handleForgotPassword}
                      disabled={isSubmitting}
                      className="auth-button"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Enlace"}
                    </button>
                    <button
                      type="button"
                      className="back-button"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setForgotPasswordEmail("");
                      }}
                      disabled={isSubmitting}
                    >
                      Volver al inicio de sesión
                    </button>
                  </div>
                </>
              )}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                required
                className="auth-input"
                disabled={isSubmitting}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={registerData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                required
                className="auth-input"
                disabled={isSubmitting}
              />

              {/* Campo de contraseña de registro con indicador de fortaleza */}
              <div
                className="password-input-container"
                style={{ position: "relative", width: "100%" }}
              >
                <input
                  type={showRegisterPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={registerData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  onKeyDown={handleRegisterPasswordKeyDown}
                  onContextMenu={handleRegisterPasswordContextMenu}
                  required
                  className="auth-input"
                  disabled={isSubmitting}
                  style={{
                    paddingRight: "45px",
                    borderLeft: `4px solid ${getPasswordStrengthColor(
                      registerData.password
                    )}`,
                    transition: "border-color 0.3s ease",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  className="password-toggle-btn"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#666",
                    fontSize: "16px",
                  }}
                  disabled={isSubmitting}
                >
                  <i
                    className={
                      showRegisterPassword ? "fas fa-eye-slash" : "fas fa-eye"
                    }
                  ></i>
                </button>
              </div>

              {/* Indicador de fortaleza de contraseña */}
              {registerData.password && (
                <div
                  className="password-strength-indicator"
                  style={{
                    marginTop: "5px",
                    marginBottom: "15px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: getPasswordStrengthColor(
                        registerData.password
                      ),
                      transition: "background-color 0.3s ease",
                    }}
                  ></div>
                  <span
                    style={{
                      color: getPasswordStrengthColor(registerData.password),
                      fontWeight: "500",
                    }}
                  >
                    Contraseña {getPasswordStrengthText(registerData.password)}
                    {registerData.password.length < 6 &&
                      " (mínimo 6 caracteres)"}
                    {registerData.password.length >= 6 &&
                      registerData.password.length < 10 &&
                      " (recomendado 10+ caracteres)"}
                  </span>
                </div>
              )}

              <button
                onClick={handleRegister}
                disabled={isSubmitting}
                className="auth-button register-button"
              >
                {isSubmitting ? "Registrando..." : "Registrarse"}
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
              <p className="overlay-text-small">
                Para seguir conectado con nosotros, por favor inicia sesión con
                tus datos
              </p>
              <button
                className="auth-button ghost-button"
                onClick={() => {
                  setIsRightPanelActive(false);
                  setShowForgotPassword(false);
                  setForgotPasswordEmail("");
                }}
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="overlay-text-large">¡Hola, Amigo!</h1>
              <p className="overlay-text-small">
                Ingresa tus datos personales y comienza tu aventura con nosotros
              </p>
              <button
                className="auth-button ghost-button"
                onClick={() => setIsRightPanelActive(true)}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal modal={modal} hideModal={hideModal} />
    </div>
  );
};

export default SlidingAuthForm;
