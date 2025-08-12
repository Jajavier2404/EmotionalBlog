import React from 'react';
import { useEntryForm } from '../hooks/useEntryForm';
import type { Entry } from '../types/Entry';

interface EntryFormModalProps {
  entry?: Entry;
  onClose: () => void;
  onSuccess: () => void;
}

const EntryFormModal: React.FC<EntryFormModalProps> = ({ entry, onClose, onSuccess }) => {
  const { formData, handleChange, handleSubmit } = useEntryForm(entry);
  const isEditing = !!entry;

  const handleFormSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e);
    onSuccess();
  };

  return (
    <div className="modal-backdrop">
      <div className="custom-modal">
        <button className="absolute-close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{isEditing ? 'Editar Entrada' : 'Crear Nueva Entrada'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="emocion">Emoción</label>
            <input
              type="text"
              id="emocion"
              name="emocion"
              value={formData.emocion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="texto">Texto</label>
            <textarea
              id="texto"
              name="texto"
              value={formData.texto}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
        </form>
      </div>
    </div>
  );
};

export default EntryFormModal;
