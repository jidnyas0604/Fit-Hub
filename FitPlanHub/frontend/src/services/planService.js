import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/plans';

const createPlan = (title, description, price, duration) => {
  return axios.post(API_URL, {
    title,
    description,
    price,
    duration,
  }, { headers: authHeader() });
};

const getMyPlans = () => {
  return axios.get(`${API_URL}/my-plans`, { headers: authHeader() }); // This route needs to be created in the backend
};

const updatePlan = (id, title, description, price, duration) => {
  return axios.put(`${API_URL}/${id}`, {
    title,
    description,
    price,
    duration,
  }, { headers: authHeader() });
};

const deletePlan = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const planService = {
  createPlan,
  getMyPlans,
  updatePlan,
  deletePlan,
};

export default planService;
