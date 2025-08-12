import { useState, useEffect } from 'react';
import { createEntry, updateEntry } from '../api/entryApi';
import type { Entry, CreateEntryDto, UpdateEntryDto } from '../types/Entry';

export const useEntryForm = (entry?: Entry) => {
  const [formData, setFormData] = useState<CreateEntryDto | UpdateEntryDto>({
    title: '',
    emocion: '',
    texto: '',
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        title: entry.title,
        emocion: entry.emocion,
        texto: entry.texto,
      });
    }
  }, [entry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (entry) {
      await updateEntry(entry.id, formData as UpdateEntryDto);
    } else {
      await createEntry(formData as CreateEntryDto);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};
