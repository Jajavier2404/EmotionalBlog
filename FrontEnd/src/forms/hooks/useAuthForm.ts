import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthData, ModalState } from "../types/AuthData";
import { registerUser, loginUser, forgotPassword } from "../api/authApi";

const useAuthForm = () => {
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  // LoginData solo con email y password
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // RegisterData mantiene todos los campos
  const [registerData, setRegisterData] = useState<AuthData>({
    username: "",
    email: "",
    password: "",
  });

  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
    message: "",
    isSuccess: false,
  });

  const showModal = (message: string, isSuccess: boolean) => {
    setModal({ isVisible: true, message, isSuccess });
  };

  const hideModal = () => {
    setModal({ isVisible: false, message: "", isSuccess: false });
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      showModal("Por favor ingresa tu correo electrónico", false);
      return;
    }

    setIsSubmitting(true);
    try {
      await forgotPassword(forgotPasswordEmail);
      showModal(
        "Se ha enviado un enlace de recuperación a tu correo electrónico",
        true
      );
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotPasswordEmail("");
        hideModal();
      }, 3000);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "Error al enviar el correo";
      showModal(message, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async () => {
    if (!registerData.username || !registerData.email || !registerData.password) {
      showModal("Todos los campos son obligatorios", false);
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Calling registerUser with data:", registerData);
      await registerUser(registerData);
      showModal("Registro exitoso. ¡Ahora inicia sesión!", true);
      setTimeout(() => {
        setIsRightPanelActive(false);
        setRegisterData({ username: "", email: "", password: "" });
        hideModal();
      }, 2000);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "Error en el registro";
      showModal(message, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      showModal("Todos los campos son obligatorios", false);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await loginUser(loginData);
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        showModal("Inicio de sesión exitoso. Redirigiendo...", true);
        setTimeout(() => {
          hideModal();
          navigate("/");
        }, 1500);
        setLoginData({ email: "", password: "" });
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "Credenciales inválidas.";
      showModal(message, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isRightPanelActive,
    setIsRightPanelActive,
    isSubmitting,
    loginData,
    setLoginData,
    registerData,
    setRegisterData,
    modal,
    showModal,
    hideModal,
    handleRegister,
    handleLogin,
    showForgotPassword,
    setShowForgotPassword,
    forgotPasswordEmail,
    setForgotPasswordEmail,
    handleForgotPassword,
  };
};

export default useAuthForm;
