import api from './api';
import { AxiosError } from 'axios';

export const uploadPicture = async (file: File, category: string) => {
  const formData = new FormData();
  formData.append('picture', file);
  formData.append('category', category);

  const response = await api.post('/pictures/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).catch(
    (error: AxiosError) => {
      if (error.response) {
        throw error.response.data;
      }
  });
  
  return response;
}

export const getSelectedPictures = async (selected: string, tag: string) => {
  try {
    let response;
    if (selected === 'For You') {
      response = await api.get('/pictures/top');
    } else if (selected === 'Following') {
      response = await api.get('/pictures/following');
    } else {
      response = await api.get('/pictures/tag/' + selected);
    }
    return response;
  }
  catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
  
}
