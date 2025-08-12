import axios from "axios";
import type { CreateEntryDto, Entry, UpdateEntryDto } from "../types/Entry";

const API_URL = "http://localhost:3000/entries";

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getEntries = (): Promise<{ data: Entry[] }> => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

export const createEntry = (data: CreateEntryDto) => {
  return axios.post(API_URL, data, { headers: getAuthHeaders() });
};

export const updateEntry = (id: string, data: UpdateEntryDto) => {
  return axios.patch(`${API_URL}/${id}`, data, { headers: getAuthHeaders() });
};

export const deleteEntry = (id: string) => {
  return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};
