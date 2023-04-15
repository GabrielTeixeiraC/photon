import { AxiosError } from 'axios';
import api from './api';

export const getLoggedUser = async () => {
  try {
    const response = await api.get('/users/me/');
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};