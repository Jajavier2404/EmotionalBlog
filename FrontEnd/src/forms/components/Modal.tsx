import React from 'react';
import type { ModalState } from '../types/AuthData';

interface ModalProps {
  modal: ModalState;
  hideModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ modal, hideModal }) => {
  return (
    <>
      <div
        className={`modal-backdrop ${modal.isVisible ? 'visible' : ''}`}
        onClick={hideModal}
        style={{
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(8px)', // Para compatibilidad con Safari
        }}
      ></div>
      <div className={`custom-modal ${modal.isVisible ? 'visible' : ''}`}>
        <div className="relative">
          <button
            className="absolute-close-button"
            onClick={hideModal}
          >
            &times;
          </button>
          <div className={`modal-icon ${modal.isSuccess ? 'success' : 'error'}`}>
            {modal.isSuccess ? '✓' : '✕'}
          </div>
          <p className="text-white text-lg font-semibold mt-4">{modal.message}</p>
        </div>
      </div>
    </>
  );
};

export default Modal;