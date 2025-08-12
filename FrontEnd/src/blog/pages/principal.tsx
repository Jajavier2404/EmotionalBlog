import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const EmotionalBlogApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Estados para el formulario
  const [formData, setFormData] = useState({
    title: '',
    emocion: '',
    texto: ''
  });

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

  // Función para cargar entradas
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

  // Función para crear nueva entrada
  const handleCreate = async () => {
    setError(null);
    try {
      await api.post('/entries', formData);
      setFormData({ title: '', emocion: '', texto: '' });
      setCurrentView('list');
      loadEntries(); // Recargar entradas
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message || err.message : "Ocurrió un error desconocido");
    }
  };

  // Función para actualizar entrada
  const handleUpdate = async () => {
    if (!selectedEntry) return;
    setError(null);
    try {
      await api.patch(`/entries/${selectedEntry.id}`, formData);
      setFormData({ title: '', emocion: '', texto: '' });
      setSelectedEntry(null);
      setCurrentView('list');
      loadEntries(); // Recargar entradas
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message || err.message : "Ocurrió un error desconocido");
    }
  };

  // Función para eliminar entrada
  const handleDelete = async (entryId: string) => {
    setError(null);
    if (confirm('¿Estás seguro de eliminar esta entrada?')) {
      try {
        await api.delete(`/entries/${entryId}`);
        loadEntries(); // Recargar entradas
      } catch (err) {
        setError(axios.isAxiosError(err) ? err.response?.data?.message || err.message : "Ocurrió un error desconocido");
      }
    }
  };

  // Preparar formulario para edición
  const startEdit = (entry: Entry) => {
    setSelectedEntry(entry);
    setFormData({
      title: entry.title,
      emocion: entry.emocion,
      texto: entry.texto
    });
    setCurrentView('edit');
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        📝 Diario Emocional
      </h1>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* Navegación */}
      <nav style={{ marginBottom: '30px', textAlign: 'center' }}>
        <button 
          onClick={() => setCurrentView('list')}
          style={{ 
            margin: '0 10px', 
            padding: '10px 20px', 
            backgroundColor: currentView === 'list' ? '#007bff' : '#f8f9fa',
            color: currentView === 'list' ? 'white' : '#333',
            border: '1px solid #dee2e6',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          📋 Ver Entradas
        </button>
        <button 
          onClick={() => {
            setCurrentView('create');
            setFormData({ title: '', emocion: '', texto: '' });
          }}
          style={{ 
            margin: '0 10px', 
            padding: '10px 20px', 
            backgroundColor: currentView === 'create' ? '#28a745' : '#f8f9fa',
            color: currentView === 'create' ? 'white' : '#333',
            border: '1px solid #dee2e6',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ➕ Nueva Entrada
        </button>
        <button 
          onClick={loadEntries}
          style={{ 
            margin: '0 10px', 
            padding: '10px 20px', 
            backgroundColor: '#17a2b8',
            color: 'white',
            border: '1px solid #dee2e6',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Recargar
        </button>
      </nav>

      {/* Vista: Lista de Entradas */}
      {currentView === 'list' && (
        <div>
          <h2 style={{ color: '#495057', marginBottom: '20px' }}>Mis Entradas del Diario</h2>
          {entries.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6c757d', fontStyle: 'italic' }}>
              No hay entradas todavía. ¡Crea tu primera entrada!
            </p>
          ) : (
            entries.map((entry) => (
              <div 
                key={entry.id} 
                style={{ 
                  border: '1px solid #dee2e6', 
                  borderRadius: '8px', 
                  padding: '20px', 
                  marginBottom: '15px',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ margin: 0, color: '#007bff' }}>{entry.title}</h3>
                    <span 
                      style={{ 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        padding: '4px 12px', 
                        borderRadius: '15px', 
                        fontSize: '14px',
                        marginRight: '10px'
                      }}
                    >
                      😊 {entry.emocion}
                    </span>
                    <small style={{ color: '#6c757d' }}>
                      {formatDate(entry.fecha)}
                    </small>
                  </div>
                  <div>
                    <button 
                      onClick={() => startEdit(entry)}
                      style={{ 
                        padding: '5px 10px', 
                        marginRight: '5px', 
                        backgroundColor: '#ffc107',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(entry.id)}
                      style={{ 
                        padding: '5px 10px', 
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
                <p style={{ margin: '10px 0 0 0', lineHeight: '1.5', color: '#495057' }}>
                  {entry.texto}
                </p>
                <small style={{ color: '#6c757d', fontSize: '12px' }}>
                  ID: {entry.id}
                </small>
              </div>
            ))
          )}
        </div>
      )}

      {/* Vista: Crear Nueva Entrada */}
      {currentView === 'create' && (
        <div>
          <h2 style={{ color: '#28a745', marginBottom: '20px' }}>➕ Nueva Entrada del Diario</h2>
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#495057' }}>
                Título:
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ced4da',
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#495057' }}>
                Emoción:
              </label>
              <select 
                value={formData.emocion}
                onChange={(e) => setFormData({ ...formData, emocion: e.target.value })}
                required
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '5px', 
                  border: '1px solid #ced4da',
                  fontSize: '16px'
                }}
              >
                <option value="">Selecciona una emoción...</option>
                <option value="muy feliz">😄 Muy Feliz</option>
                <option value="feliz">😊 Feliz</option>
                <option value="tranquilo">😌 Tranquilo</option>
                <option value="neutral">😐 Neutral</option>
                <option value="triste">😢 Triste</option>
                <option value="ansioso">😰 Ansioso</option>
                <option value="enojado">😠 Enojado</option>
                <option value="motivado">💪 Motivado</option>
                <option value="cansado">😴 Cansado</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#495057' }}>
                ¿Cómo te sientes hoy? Cuéntanos tu día:
              </label>
              <textarea 
                value={formData.texto}
                onChange={(e) => setFormData({ ...formData, texto: e.target.value })}
                required
                rows={6}
                placeholder="Describe cómo te sientes, qué ha pasado en tu día, qué te ha hecho sentir así..."
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '5px', 
                  border: '1px solid #ced4da',
                  fontSize: '16px',
                  resize: 'vertical',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={handleCreate}
                style={{ 
                  padding: '12px 30px', 
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                💾 Guardar Entrada
              </button>
              <button 
                type="button"
                onClick={() => setCurrentView('list')}
                style={{ 
                  padding: '12px 30px', 
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vista: Editar Entrada */}
      {currentView === 'edit' && selectedEntry && (
        <div>
          <h2 style={{ color: '#ffc107', marginBottom: '20px' }}>✏️ Editar Entrada</h2>
          <div style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '5px', marginBottom: '15px', border: '1px solid #ffeaa7' }}>
            <small style={{ color: '#856404' }}>
              Editando entrada del {formatDate(selectedEntry.fecha)} (ID: {selectedEntry.id})
            </small>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#495057' }}>
                Título:
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ced4da',
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#495057' }}>
                Emoción:
              </label>
              <select 
                value={formData.emocion}
                onChange={(e) => setFormData({ ...formData, emocion: e.target.value })}
                required
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '5px', 
                  border: '1px solid #ced4da',
                  fontSize: '16px'
                }}
              >
                <option value="muy feliz">😄 Muy Feliz</option>
                <option value="feliz">😊 Feliz</option>
                <option value="tranquilo">😌 Tranquilo</option>
                <option value="neutral">😐 Neutral</option>
                <option value="triste">😢 Triste</option>
                <option value="ansioso">😰 Ansioso</option>
                <option value="enojado">😠 Enojado</option>
                <option value="motivado">💪 Motivado</option>
                <option value="cansado">😴 Cansado</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#495057' }}>
                Actualiza tu texto:
              </label>
              <textarea 
                value={formData.texto}
                onChange={(e) => setFormData({ ...formData, texto: e.target.value })}
                required
                rows={6}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '5px', 
                  border: '1px solid #ced4da',
                  fontSize: '16px',
                  resize: 'vertical',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={handleUpdate}
                style={{ 
                  padding: '12px 30px', 
                  backgroundColor: '#ffc107',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                💾 Actualizar Entrada
              </button>
              <button 
                type="button"
                onClick={() => {
                  setCurrentView('list');
                  setSelectedEntry(null);
                  setFormData({ title: '', emocion: '', texto: '' });
                }}
                style={{ 
                  padding: '12px 30px', 
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default EmotionalBlogApp;