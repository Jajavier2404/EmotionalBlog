import React, { useState } from 'react';
import { createEntry } from '../api/entryApi';
import type { CreateEntryDto } from '../types/Entry.ts';

interface CreateEntryModalProps {
  onClose: () => void;
  onEntryCreated: () => void;
}

const CreateEntryModal: React.FC<CreateEntryModalProps> = ({ onClose, onEntryCreated }) => {
  const [formData, setFormData] = useState<CreateEntryDto>({
    title: '',
    emocion: '',
    texto: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEntry(formData);
      onEntryCreated();
      onClose();
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="custom-modal">
        <button className="absolute-close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Crear Nueva Entrada</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Crear</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEntryModal;
