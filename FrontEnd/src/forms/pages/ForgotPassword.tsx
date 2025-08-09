import React from "react";
import { useResetPassword } from "../hooks/useResetPassword";
import "../styles/ForgotPassword.css";

const ForgotPassword: React.FC = () => {
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

  return (
    <div className="reset-password-app">
      {/* Home Button */}
      <div className="home-button-text" onClick={handleGoHome}>
        <i className="fas fa-home"></i>
        <span className="home-text">Inicio</span>
      </div>

      {/* Main Container */}
      <div className="reset-password-container">
        {/* Header */}
        <div className="reset-password-header">
          <div className="reset-password-icon">
            <i className="fas fa-key"></i>
          </div>
          <h1 className="main-heading">Restablecer Contraseña</h1>
          <p className="sub-text">
            Ingresa tu nueva contraseña. Asegúrate de que sea segura y fácil de recordar.
          </p>
        </div>

        {/* Messages */}
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

        {/* Form */}
        <form className="reset-password-form" onSubmit={(e) => e.preventDefault()}>
          {/* New Password Field */}
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="password"
                className={`auth-input ${error && newPassword ? "error" : ""}`}
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                autoComplete="new-password"
              />
              <i className="fas fa-lock input-icon"></i>
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

          {/* Confirm Password Field */}
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="password"
                className={`auth-input ${error && confirmPassword ? "error" : ""}`}
                placeholder="Confirmar nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                autoComplete="new-password"
              />
              <i className="fas fa-lock input-icon"></i>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="auth-button"
            onClick={handleResetPassword}
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                <span>Procesando...</span>
              </>
            ) : (
              "Restablecer contraseña"
            )}
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={`modal-backdrop ${showModal ? "visible" : ""}`}>
          <div className={`custom-modal ${showModal ? "visible" : ""}`}>
            <button className="modal-close-button" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>

            <div className={`modal-icon ${modalType}`}>
              <i
                className={
                  modalType === "success" ? "fas fa-check" : "fas fa-times"
                }
              ></i>
            </div>

            <h3 className="modal-title">
              {modalType === "success" ? "¡Éxito!" : "Error"}
            </h3>

            <p className="modal-message">
              {message || error}
            </p>

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

export default ForgotPassword;
