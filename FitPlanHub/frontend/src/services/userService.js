import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api';

const getAllPlans = () => {
  return axios.get(`${API_URL}/plans`);
};

const getPlanDetails = (id) => {
  return axios.get(`${API_URL}/plans/${id}`, { headers: authHeader() }); // Requires auth to check subscription status
};

const subscribeToPlan = (planId) => {
  return axios.post(`${API_URL}/subscriptions/${planId}`, {}, { headers: authHeader() });
};

const getUserFeed = () => {
  return axios.get(`${API_URL}/feed`, { headers: authHeader() });
};

const followTrainer = (trainerId) => {
  return axios.put(`${API_URL}/users/follow/${trainerId}`, {}, { headers: authHeader() });
};

const unfollowTrainer = (trainerId) => {
  return axios.put(`${API_URL}/users/unfollow/${trainerId}`, {}, { headers: authHeader() });
};

const getTrainerProfile = (trainerId) => {
  return axios.get(`${API_URL}/users/trainer/${trainerId}`, { headers: authHeader() });
};

const userService = {
  getAllPlans,
  getPlanDetails,
  subscribeToPlan,
  getUserFeed,
  followTrainer,
  unfollowTrainer,
  getTrainerProfile,
};

export default userService;
