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
    if (e.ctrlKey && ["c", "a", "x", "v", "u"].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  };
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();

  // Coincidencia de contraseñas
  const passwordsMatch = confirmPassword && newPassword === confirmPassword;

  // Función para cerrar modal al hacer click en el backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="reset-password-app">
      {/* Botón de inicio */}
      <div className="reset-password-home-button" onClick={handleGoHome}>
        <i className="fas fa-home"></i>
        <span className="reset-password-home-text">Inicio</span>
      </div>

      <div className="reset-password-container">
        {/* Encabezado */}
        <div className="reset-password-header">
          <div className="reset-password-icon">
            <i className="fas fa-key"></i>
          </div>
          <h1 className="reset-password-main-heading">Restablecer Contraseña</h1>
          <p className="reset-password-sub-text">
            Ingresa tu nueva contraseña. Asegúrate de que sea segura y fácil de recordar.
          </p>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="reset-password-message reset-password-message--error">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}
        {message && !showModal && (
          <div className="reset-password-message reset-password-message--success">
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
          <div className="reset-password-form-group">
            <div className="reset-password-input-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                className={`reset-password-input ${error && newPassword ? "reset-password-input--error" : ""}`}
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                onContextMenu={handleContextMenu}
                disabled={loading}
                autoComplete="new-password"
              />
              <i className="fas fa-lock reset-password-input-icon"></i>
              <button
                type="button"
                className="reset-password-toggle-btn"
                onClick={() => setShowNewPassword((prev) => !prev)}
                disabled={loading}
                aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <i className={showNewPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>

            {newPassword && (
              <div className="reset-password-strength">
                <div className="reset-password-strength-bar-container">
                  <div
                    className={`reset-password-strength-bar ${
                      newPassword.length < 6
                        ? "reset-password-strength-bar--weak"
                        : newPassword.length < 10
                        ? "reset-password-strength-bar--medium"
                        : "reset-password-strength-bar--strong"
                    }`}
                  >
                    <div className="reset-password-strength-fill"></div>
                  </div>
                </div>
                <span
                  className="reset-password-strength-text"
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
          <div className="reset-password-form-group">
            <div className="reset-password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`reset-password-input ${error && confirmPassword ? "reset-password-input--error" : ""}`}
                placeholder="Confirmar nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                onContextMenu={handleContextMenu}
                disabled={loading}
                autoComplete="new-password"
              />
              <i className="fas fa-lock reset-password-input-icon"></i>
              <button
                type="button"
                className="reset-password-toggle-btn"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                disabled={loading}
                aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>

            {confirmPassword && (
              <div className={`reset-password-match ${passwordsMatch ? "reset-password-match--success" : "reset-password-match--error"}`}>
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
            className="reset-password-submit-btn"
            disabled={loading || !passwordsMatch || !newPassword || !confirmPassword}
            type="submit"
          >
            {loading ? (
              <>
                <div className="reset-password-submit-spinner"></div>
                Procesando...
              </>
            ) : (
              "Restablecer contraseña"
            )}
          </button>
        </form>
      </div>

      {/* Modal de carga */}
      {loading && (
        <div className="reset-password-modal-backdrop reset-password-modal-backdrop--visible">
          <div className="reset-password-loading-modal">
            <div className="reset-password-loading-spinner"></div>
            <div className="reset-password-loading-text">Procesando...</div>
            <div className="reset-password-loading-subtext">Restableciendo tu contraseña</div>
          </div>
        </div>
      )}

      {/* Modal de éxito/error */}
      {showModal && (
        <div
          className="reset-password-modal-backdrop reset-password-modal-backdrop--visible"
          onClick={handleBackdropClick}
        >
          <div className="reset-password-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button
              className="reset-password-modal-close"
              onClick={closeModal}
              aria-label="Cerrar modal"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className={`reset-password-modal-icon reset-password-modal-icon--${modalType}`}>
              <i className={modalType === "success" ? "fas fa-check" : "fas fa-times"}></i>
            </div>

            <h3 id="modal-title" className="reset-password-modal-title">
              {modalType === "success" ? "¡Éxito!" : "Error"}
            </h3>

            <p className="reset-password-modal-message">
              {message || error}
            </p>

            {modalType === "success" && (
              <p className="reset-password-modal-redirect">
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
