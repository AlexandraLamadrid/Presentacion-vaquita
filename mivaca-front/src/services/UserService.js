import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_API_URL

console.log(BASE_URL)
const create = (body) => {
  return axios.post(`${BASE_URL}/users`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { create };
