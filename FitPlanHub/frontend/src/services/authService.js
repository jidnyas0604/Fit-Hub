import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = (name, email, password, role) => {
  return axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    role,
  });
};

const login = (email, password) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
