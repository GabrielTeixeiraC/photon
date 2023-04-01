import api from './api';
import { AxiosError } from 'axios';

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
} 

export const signup = async (name: string, email: string, password: string) => {
  const response = await api.post('/users/', { name, email, password }).catch(
    (error: AxiosError) => {
      if (error.response) {
        throw error.response.data;
      }
  });

  return response;
}