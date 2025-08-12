import React, { useState, useEffect } from 'react';

interface Entry {
    id: string;
    title: string;
    fecha: string;
    emocion: string;
    texto: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }

interface EntryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: Entry | null;
  onSave: (formData: any) => void;
  mode: 'create' | 'edit';
}

const EntryFormModal: React.FC<EntryFormModalProps> = ({ isOpen, onClose, entry, onSave, mode }) => {
  const [formData, setFormData] = useState({
    title: '',
    emocion: '',
    texto: ''
  });

  useEffect(() => {
    if (isOpen && entry) {
      setFormData({
        title: entry.title || '',
        emocion: entry.emocion || '',
        texto: entry.texto || ''
      });
    } else if (isOpen) {
      setFormData({
        title: '',
        emocion: '',
        texto: ''
      });
    }
  }, [entry, isOpen]);


  const emotionOptions = [
    { value: 'muy feliz', label: '😄 Muy Feliz', color: '#fbbf24' },
    { value: 'feliz', label: '😊 Feliz', color: '#34d399' },
    { value: 'tranquilo', label: '😌 Tranquilo', color: '#60a5fa' },
    { value: 'neutral', label: '😐 Neutral', color: '#9ca3af' },
    { value: 'triste', label: '😢 Triste', color: '#60a5fa' },
    { value: 'ansioso', label: '😰 Ansioso', color: '#f87171' },
    { value: 'enojado', label: '😠 Enojado', color: '#ef4444' },
    { value: 'motivado', label: '💪 Motivado', color: '#8b5cf6' },
    { value: 'cansado', label: '😴 Cansado', color: '#6b7280' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmotionChange = (emotion: string) => {
    setFormData({ ...formData, emocion: emotion });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{mode === 'edit' ? 'Editar Entrada' : 'Nueva Entrada'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Título de tu entrada</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="¿Cómo describirías tu día?"
              required
            />
          </div>

          <div className="form-group">
            <label>¿Cómo te sientes?</label>
            <div className="emotion-grid">
              {emotionOptions.map((emotion) => (
                <div
                  key={emotion.value}
                  className={`emotion-option ${formData.emocion === emotion.value ? 'selected' : ''}`}
                  style={{ '--emotion-color': emotion.color } as React.CSSProperties}
                  onClick={() => handleEmotionChange(emotion.value)}
                >
                  <span>{emotion.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="texto">Cuéntanos más sobre tu día</label>
            <textarea
              id="texto"
              name="texto"
              value={formData.texto}
              onChange={handleChange}
              placeholder="Describe tus pensamientos, sentimientos y experiencias del día..."
              rows={6}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn-primary" onClick={handleSubmit}>
              {mode === 'edit' ? 'Actualizar' : 'Guardar'} Entrada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryFormModal;