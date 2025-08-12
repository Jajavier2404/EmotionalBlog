import React, { useEffect, useState } from 'react';
import { getEntries, deleteEntry } from '../api/entryApi';
import type { Entry } from '../types/Entry';
import EntryCard from '../components/EntryCard';
import EntryFormModal from '../components/EntryFormModal';
import Header from '../../Home/components/Header';
import EmotionalBlogApp from './principal';
import '../styles/blog.css';

const BlogPage: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | undefined>(undefined);
  const [menuActive, setMenuActive] = useState(false);

  const openMenu = () => setMenuActive(true);
  const closeMenu = () => setMenuActive(false);

  const fetchEntries = async () => {
    try {
      const response = await getEntries();
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingEntry(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (entry: Entry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(undefined);
  };

  const handleSuccess = () => {
    handleCloseModal();
    fetchEntries();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta entrada?')) {
      try {
        await deleteEntry(id);
        fetchEntries();
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  return (

    <div className="blog-page">
      <Header menuActive={menuActive} openMenu={openMenu} closeMenu={closeMenu} />
      <EmotionalBlogApp />
      <header className="blog-header">
        <h1>Mi Blog Emocional</h1>
        <button onClick={handleOpenCreateModal}>Crear Nueva Entrada</button>
      </header>
      <main className="entries-list">
        {entries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onEdit={handleOpenEditModal}
            onDelete={handleDelete}
          />
        ))}
      </main>
      {isModalOpen && (
        <EntryFormModal
          entry={editingEntry}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default BlogPage;
