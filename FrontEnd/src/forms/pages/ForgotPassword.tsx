import React, { useState } from "react";
import { useResetPassword } from "../hooks/useResetPassword";
import "../styles/ForgotPassword.css";

const ResetPassword: React.FC = () => {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    message,
    error,
    showModal,
    modalType,
    handleResetPassword,
    handleGoHome,
    closeModal,
  } = useResetPassword();

  // Mostrar/ocultar contraseñas
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Evitar copiar/pegar
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && ["c", "a", "x", "v"].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  };
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();

  // Coincidencia de contraseñas
  const passwordsMatch = confirmPassword && newPassword === confirmPassword;

  return (
    <div className="reset-password-app">
      {/* Botón de inicio */}
      <div className="home-button-text" onClick={handleGoHome}>
        <i className="fas fa-home"></i>
        <span className="home-text">Inicio</span>
      </div>

      <div className="reset-password-container">
        {/* Encabezado */}
        <div className="reset-password-header">
          <div className="reset-password-icon">
            <i className="fas fa-key"></i>
          </div>
          <h1 className="main-heading">Restablecer Contraseña</h1>
          <p className="sub-text">
            Ingresa tu nueva contraseña. Asegúrate de que sea segura y fácil de recordar.
          </p>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="message error">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}
        {message && (
          <div className="message success">
            <i className="fas fa-check-circle"></i>
            <span>{message}</span>
          </div>
        )}

        {/* Formulario */}
        <form
          className="reset-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleResetPassword();
          }}
        >
          {/* Campo Nueva contraseña */}
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                className={`auth-input ${error && newPassword ? "error" : ""}`}
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                onContextMenu={handleContextMenu}
                disabled={loading}
                autoComplete="new-password"
              />
              <i className="fas fa-lock input-icon"></i>
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowNewPassword((prev) => !prev)}
                disabled={loading}
              >
                <i className={showNewPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>

            {newPassword && (
              <div className="password-strength">
                <div className="strength-bar-container">
                  <div
                    className={`strength-bar ${
                      newPassword.length < 6
                        ? "strength-weak"
                        : newPassword.length < 10
                        ? "strength-medium"
                        : "strength-strong"
                    }`}
                  >
                    <div className="strength-fill"></div>
                  </div>
                </div>
                <span
                  className="strength-text"
                  style={{
                    color:
                      newPassword.length < 6
                        ? "#ef4444"
                        : newPassword.length < 10
                        ? "#f59e0b"
                        : "#10b981",
                  }}
                >
                  Seguridad:{" "}
                  {newPassword.length < 6
                    ? "Débil"
                    : newPassword.length < 10
                    ? "Media"
                    : "Fuerte"}
                </span>
              </div>
            )}
          </div>

          {/* Campo Confirmar contraseña */}
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`auth-input ${error && confirmPassword ? "error" : ""}`}
                placeholder="Confirmar nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                onContextMenu={handleContextMenu}
                disabled={loading}
                autoComplete="new-password"
              />
              <i className="fas fa-lock input-icon"></i>
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                disabled={loading}
              >
                <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>

            {confirmPassword && (
              <div className={`password-match ${passwordsMatch ? "match" : "no-match"}`}>
                <i className={passwordsMatch ? "fas fa-check" : "fas fa-times"}></i>
                <span>
                  {passwordsMatch
                    ? "Las contraseñas coinciden"
                    : "Las contraseñas no coinciden"}
                </span>
              </div>
            )}
          </div>

          {/* Botón de envío */}
          <button
            className="auth-button"
            disabled={loading || !passwordsMatch}
            type="submit"
          >
            Restablecer contraseña
          </button>
        </form>
      </div>

      {/* Cargando */}
      {loading && (
        <div className="loading-modal visible">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <div className="loading-text">Procesando...</div>
            <div className="loading-subtext">Restableciendo tu contraseña</div>
          </div>
        </div>
      )}

      {/* Modal de éxito/error */}
      {showModal && (
        <div className="modal-backdrop visible">
          <div className="custom-modal visible">
            <button className="modal-close-button" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            <div className={`modal-icon ${modalType}`}>
              <i className={modalType === "success" ? "fas fa-check" : "fas fa-times"}></i>
            </div>
            <h3 className="modal-title">
              {modalType === "success" ? "¡Éxito!" : "Error"}
            </h3>
            <p className="modal-message">{message || error}</p>
            {modalType === "success" && (
              <p className="modal-redirect-text">
                Serás redirigido al login en unos segundos...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
