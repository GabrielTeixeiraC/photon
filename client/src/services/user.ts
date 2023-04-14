import api from './api';
import { AxiosError } from 'axios';

export const getLoggedUser = async () => {
  const response = await api.get(`/users/me`).catch(
    (error: AxiosError) => {
      if (error.response) {
        throw error.response.data;
      }
  });

  return response;
}