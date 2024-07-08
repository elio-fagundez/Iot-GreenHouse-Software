import axios from 'axios';

const API_URL = '/api';

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

