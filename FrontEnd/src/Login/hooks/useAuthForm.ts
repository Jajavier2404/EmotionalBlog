import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthData, ModalState } from '../types/AuthData';

const useAuthForm = () => {
  const navigate = useNavigate();

  const [isRightPanelActive, setIsRightPanelActive] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<AuthData>({
    username: '',
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState<AuthData>({
    username: '',
    email: '',
    password: ''
  });
  const [modal, setModal] = useState<ModalState>({ isVisible: false, message: '', isSuccess: false });

  const showModal = (message: string, isSuccess: boolean): void => {
    setModal({ isVisible: true, message, isSuccess });
  };

  const hideModal = (): void => {
    setModal({ isVisible: false, message: '', isSuccess: false });
  };

  const handleRegister = async (): Promise<void> => {
    if (!registerData.username || !registerData.email || !registerData.password) {
      showModal('Todos los campos son obligatorios', false);
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(registerData)
      });
      const data = await response.json();
      if (response.ok) {
        showModal('Registro exitoso. ¡Ahora inicia sesión!', true);
        setTimeout(() => {
          setIsRightPanelActive(false);
          setRegisterData({ username: '', email: '', password: '' });
          hideModal();
        }, 2000);
      } else {
        const errorMessage = data.message || data.detail || 'Error en el registro';
        showModal(errorMessage, false);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      showModal('Error de conexión con el servidor', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (): Promise<void> => {
    if (!loginData.username || !loginData.email || !loginData.password) {
      showModal('Todos los campos son obligatorios', false);
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          username: loginData.username,
          email: loginData.email,
          password: loginData.password
        })
      });
      const data = await response.json();
      if (response.ok && data.access_token) {
        localStorage.setItem('token', data.access_token);
        showModal('Inicio de sesión exitoso. Redirigiendo...', true);
        setTimeout(() => {
          hideModal();
          navigate('/');
        }, 1500);
        setLoginData({ username: '', email: '', password: '' });
      } else {
        const errorMessage = data.message || data.detail || 'Credenciales inválidas.';
        showModal(errorMessage, false);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      showModal('Error de conexión con el servidor.', false);
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
  };
};

export default useAuthForm;
