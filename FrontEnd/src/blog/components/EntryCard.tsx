import React from 'react';
import type { Entry } from '../types/Entry';

interface EntryCardProps {
  entry: Entry;
  onEdit: (entry: Entry) => void;
  onDelete: (id: string) => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onEdit, onDelete }) => {
  return (
    <div className="entry-card">
      <h2>{entry.title}</h2>
      <p><strong>Emoción:</strong> {entry.emocion}</p>
      <p className="entry-card-text">{entry.texto}</p>
      <div className="entry-card-footer">
        <small>{new Date(entry.fecha).toLocaleDateString()}</small>
        <div className="entry-card-actions">
          <button onClick={() => onEdit(entry)} className="card-button edit">Editar</button>
          <button onClick={() => onDelete(entry.id)} className="card-button delete">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;
