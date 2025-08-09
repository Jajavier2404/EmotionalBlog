import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authApi";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const handleResetPassword = async () => {
    setError(null);
    setMessage(null);

    if (!newPassword || !confirmPassword) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!token) {
      setError("Token no válido o expirado.");
      return;
    }
    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(token, newPassword);
      setModalType("success");
      setMessage("Contraseña restablecida con éxito.");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setModalType("error");
      setError(err.response?.data?.message || "Error al restablecer la contraseña.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => navigate("/");

  const closeModal = () => {
    setShowModal(false);
    setError(null);
    setMessage(null);
  };

  return {
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
  };
};
