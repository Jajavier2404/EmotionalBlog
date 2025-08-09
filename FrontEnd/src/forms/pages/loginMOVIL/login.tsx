import React, { useState } from "react";
import useAuthForm from "../../hooks/useAuthForm";
import Modal from "../../components/Modal";
import SocialContainer from "../../components/SocialContainer";
import { useNavigate } from "react-router-dom";
import "../../styles/loginMovil.css";

type TabType = "login" | "register";

const MobileAuthForm: React.FC = () => {
  const {
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

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("login");

  const navigate = useNavigate();

  const goHome = () => navigate("/");

  const togglePasswordVisibility = (type: "login" | "register") => {
    if (type === "login") setShowLoginPassword((prev) => !prev);
    else setShowRegisterPassword((prev) => !prev);
  };

  const passwordStrength = (password: string) => {
    if (password.length < 6) return { color: "#ef4444", text: "Débil" };
    if (password.length < 10) return { color: "#f59e0b", text: "Media" };
    return { color: "#10b981", text: "Fuerte" };
  };

  const blockCopyPaste = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (
      "ctrlKey" in e &&
      e.ctrlKey &&
      ["c", "a", "x"].includes((e as React.KeyboardEvent).key)
    ) {
      e.preventDefault();
    }
    if ("preventDefault" in e && e.type === "contextmenu") {
      e.preventDefault();
    }
  };

  return (
    <div className="mobile-auth-container">
      {/* Header */}
      <div className="mobile-header">
        <button className="mobile-home-button" onClick={goHome}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="mobile-app-title">Emotional Blog</h2>
      </div>

      <div className="mobile-form-wrapper">
        {/* Tabs */}
        <div className="mobile-tabs">
          <button
            className={`mobile-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("login");
              setShowForgotPassword(false);
            }}
          >
            Iniciar Sesión
          </button>
          <button
            className={`mobile-tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Registrarse
          </button>
        </div>

        {/* Content */}
        <div className="mobile-form-content">
          {activeTab === "login" ? (
            <div className="mobile-form-section">
              {!showForgotPassword ? (
                <>
                  <div className="mobile-welcome-text">
                    <h3>¡Bienvenido de nuevo!</h3>
                    <p>Inicia sesión para continuar</p>
                  </div>

                  <SocialContainer />

                  <div className="mobile-divider">
                    <span>o continúa con tu cuenta</span>
                  </div>

                  <div className="mobile-form-fields">
                    <input
                      type="text"
                      placeholder="Nombre de usuario"
                      value={loginData.username}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          username: e.target.value,
                        })
                      }
                      required
                      className="mobile-input"
                      disabled={isSubmitting}
                    />

                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                      className="mobile-input"
                      disabled={isSubmitting}
                    />

                    <div className="mobile-password-container">
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        required
                        className="mobile-input"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("login")}
                        className="mobile-password-toggle"
                        disabled={isSubmitting}
                      >
                        <i
                          className={
                            showLoginPassword
                              ? "fas fa-eye-slash"
                              : "fas fa-eye"
                          }
                        ></i>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="mobile-forgot-link"
                      onClick={() => setShowForgotPassword(true)}
                      disabled={isSubmitting}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>

                    <button
                      onClick={handleLogin}
                      disabled={isSubmitting}
                      className="mobile-submit-button primary"
                    >
                      {isSubmitting ? "Verificando..." : "Iniciar Sesión"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mobile-welcome-text">
                    <h3>Recuperar Contraseña</h3>
                    <p>
                      Te enviaremos un enlace para restablecer tu contraseña
                    </p>
                  </div>

                  <div className="mobile-form-fields">
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                      className="mobile-input"
                      disabled={isSubmitting}
                    />

                    <button
                      onClick={handleForgotPassword}
                      disabled={isSubmitting}
                      className="mobile-submit-button primary"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Enlace"}
                    </button>

                    <button
                      type="button"
                      className="mobile-submit-button secondary"
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
          ) : (
            <div className="mobile-form-section">
              <div className="mobile-welcome-text">
                <h3>¡Únete a nosotros!</h3>
                <p>Crea tu cuenta y comienza tu aventura</p>
              </div>

              <SocialContainer />

              <div className="mobile-divider">
                <span>o crea tu cuenta</span>
              </div>

              <div className="mobile-form-fields">
                <input
                  type="text"
                  placeholder="Nombre de usuario"
                  value={registerData.username}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      username: e.target.value,
                    })
                  }
                  required
                  className="mobile-input"
                  disabled={isSubmitting}
                />

                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                  required
                  className="mobile-input"
                  disabled={isSubmitting}
                />

                <div className="mobile-password-container">
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                    onKeyDown={blockCopyPaste}
                    onContextMenu={blockCopyPaste}
                    required
                    className="mobile-input password-strength-input"
                    disabled={isSubmitting}
                    style={{
                      borderLeft: registerData.password
                        ? `4px solid ${
                            passwordStrength(registerData.password).color
                          }`
                        : "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("register")}
                    className="mobile-password-toggle"
                    disabled={isSubmitting}
                  >
                    <i
                      className={
                        showRegisterPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </button>
                </div>

                {registerData.password && (
                  <div className="mobile-password-strength">
                    <div
                      className="strength-dot"
                      style={{
                        backgroundColor: passwordStrength(registerData.password)
                          .color,
                      }}
                    ></div>
                    <span
                      className="strength-text"
                      style={{
                        color: passwordStrength(registerData.password).color,
                      }}
                    >
                      Contraseña {passwordStrength(registerData.password).text}
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
                  className="mobile-submit-button primary"
                >
                  {isSubmitting ? "Registrando..." : "Registrarse"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal modal={modal} hideModal={hideModal} />
    </div>
  );
};

export default MobileAuthForm;
