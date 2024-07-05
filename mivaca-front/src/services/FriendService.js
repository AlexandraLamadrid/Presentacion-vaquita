import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/friends`;

const getAll = () => {
  return axios.get(BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};

export { getAll };
