import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

export const registerUser = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
}; 