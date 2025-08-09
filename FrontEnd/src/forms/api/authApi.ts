import axios from "axios";

const API_URL = "http://localhost:8000/auth";

export const registerUser = (data: any) => {
  return axios.post(`${API_URL}/register`, data);
};

export const loginUser = (data: any) => {
  return axios.post(`${API_URL}/login`, data);
};

export const forgotPassword = (email: string) => {
  return axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = (token: string, password: string) => {
  return axios.post(`${API_URL}/reset-password`, { token, password });
};
