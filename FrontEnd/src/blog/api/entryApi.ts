import axios from "axios";
import type { CreateEntryDto, Entry, UpdateEntryDto } from "../types/Entry";

const API_URL = "http://localhost:3000/entries";

// Add an interceptor to handle 401 Unauthorized responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); // Clear invalid token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

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
