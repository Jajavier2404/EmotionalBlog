import React from 'react';
import { Edit2, Trash2, Calendar } from 'lucide-react';

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

interface EntryCardProps {
  entry: Entry;
  openEditModal: (entry: Entry) => void;
  handleDelete: (id: string) => void;
  getEmotionColor: (emotion: string) => string;
  getEmotionEmoji: (emotion: string) => string;
  formatDate: (date: string) => string;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, openEditModal, handleDelete, getEmotionColor, getEmotionEmoji, formatDate }) => {
  return (
    <div className="entry-card">
      <div className="card-header">
        <div className="emotion-badge" style={{ backgroundColor: getEmotionColor(entry.emocion) }}>
          <span className="emotion-emoji">{getEmotionEmoji(entry.emocion)}</span>
          <span className="emotion-text">{entry.emocion}</span>
        </div>
        <div className="card-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => openEditModal(entry)}
            title="Editar entrada"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => handleDelete(entry.id)}
            title="Eliminar entrada"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="card-content">
        <h3 className="entry-title">{entry.title}</h3>
        <p className="entry-text">{entry.texto}</p>
      </div>

      <div className="card-footer">
        <div className="entry-date">
          <Calendar size={14} />
          <span>{formatDate(entry.fecha)}</span>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;