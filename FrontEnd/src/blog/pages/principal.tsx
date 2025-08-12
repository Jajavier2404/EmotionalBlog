import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, BookOpen, Heart } from 'lucide-react';
import EntryCard from '../components/EntryCard';
import EntryFormModal from '../components/EntryFormModal';
import '../styles/prueba.css';

// Tipos TypeScript para las entradas del blog
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

// Componente Header
const Header = () => (
    <header className="blog-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <BookOpen size={32} />
          </div>
          <div className="logo-text">
            <h1>Mi Diario Emocional</h1>
            <p>Un espacio seguro para tus pensamientos</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <Heart size={16} />
            <span>Bienestar</span>
          </div>
        </div>
      </div>
    </header>
  );

const EmotionalBlogApp: React.FC = () => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

    const getToken = () => {
        return localStorage.getItem('token');
    }

    const api = axios.create({
        baseURL: 'http://localhost:3000',
    });

    api.interceptors.request.use(config => {
        const token = getToken();
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    const loadEntries = async () => {
        setError(null);
        try {
        const response = await api.get('/entries');
        setEntries(response.data);
        } catch (err) {
        setError(axios.isAxiosError(err) ? err.response?.data?.message || err.message : "Ocurrió un error desconocido");
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const getEmotionEmoji = (emotion: string) => {
        const emotionMap: { [key: string]: string } = {
          'muy feliz': '😄',
          'feliz': '😊',
          'tranquilo': '😌',
          'neutral': '😐',
          'triste': '😢',
          'ansioso': '😰',
          'enojado': '😠',
          'motivado': '💪',
          'cansado': '😴'
        };
        return emotionMap[emotion] || '😊';
      };
    
      const getEmotionColor = (emotion: string) => {
        const colorMap: { [key: string]: string } = {
            'muy feliz': '#fbbf24',
            'feliz': '#34d399',
            'tranquilo': '#60a5fa',
            'neutral': '#9ca3af',
            'triste': '#60a5fa',
            'ansioso': '#f87171',
            'enojado': '#ef4444',
            'motivado': '#8b5cf6',
            'cansado': '#6b7280'
          };
          return colorMap[emotion] || '#60a5fa';
      };
    
      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };

    const openCreateModal = () => {
        setEditingEntry(null);
        setModalMode('create');
        setModalOpen(true);
    };

    const openEditModal = (entry: Entry) => {
        setEditingEntry(entry);
        setModalMode('edit');
        setModalOpen(true);
    };

    const handleSave = async (formData: any) => {
        setError(null);
        try {
            if (modalMode === 'create') {
                await api.post('/entries', formData);
            } else if (editingEntry) {
                await api.patch(`/entries/${editingEntry.id}`, formData);
            }
            loadEntries();
            setModalOpen(false);
        } catch (err) {
            setError(axios.isAxiosError(err) ? err.response?.data?.message || err.message : "Ocurrió un error desconocido");
        }
    };

    const handleDelete = async (entryId: string) => {
        setError(null);
        if (window.confirm('¿Estás seguro de eliminar esta entrada?')) {
            try {
                await api.delete(`/entries/${entryId}`);
                loadEntries();
            } catch (err) {
                setError(axios.isAxiosError(err) ? err.response?.data?.message || err.message : "Ocurrió un error desconocido");
            }
        }
    };

  return (
    <div className="blog-app">
      <Header />
      
      <main className="main-content">
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <div className="content-header">
          <div className="header-text">
            <h2>Tus Entradas</h2>
            <p>Explora tus pensamientos y emociones</p>
          </div>
          <button className="btn-primary" onClick={openCreateModal}>
            <Plus size={20} />
            Nueva Entrada
          </button>
        </div>

        <div className="entries-grid">
          {entries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              openEditModal={openEditModal}
              handleDelete={handleDelete}
              getEmotionColor={getEmotionColor}
              getEmotionEmoji={getEmotionEmoji}
              formatDate={formatDate}
            />
          ))}
        </div>

        {entries.length === 0 && !error && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No hay entradas todavía</h3>
            <p>Comienza escribiendo sobre tu día y tus emociones</p>
            <button className="btn-primary" onClick={openCreateModal}>
              <Plus size={20} />
              Crear mi primera entrada
            </button>
          </div>
        )}
      </main>

      <EntryFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        entry={editingEntry}
        onSave={handleSave}
        mode={modalMode}
      />
    </div>
  );
};

export default EmotionalBlogApp;
