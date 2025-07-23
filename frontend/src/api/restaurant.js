import axios from "axios";

const API_URL = "http://localhost:3000/api/restaurants";

export const getPublicRestaurant = async (slug) => {
  const res = await axios.get(`http://localhost:3000/api/restaurants/slug/${slug}`)
  return res.data
}

export const createRestaurant = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getMyRestaurant = async (token) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateMyRestaurant = async (data, token) => {
  const res = await axios.put(`${API_URL}/me`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const deleteMyRestaurant = async (token) => {
  const res = await axios.delete(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}; 