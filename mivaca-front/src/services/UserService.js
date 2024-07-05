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

const getAllNotInGroup = (groupId) => {
  return axios.get(`${BASE_URL}/users/notingroup/${groupId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};

export { create, getAllNotInGroup };
