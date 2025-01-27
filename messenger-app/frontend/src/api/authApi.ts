import axios from "axios";
import { API_URL } from "../configs/configs";
import { User } from "../types/userTypes";

export function checkAuth() {
  return axios.get(`${API_URL}/auth/check`, { withCredentials: true });
}

export function signupUser(formData: User) {
  return axios.post(`${API_URL}/auth/signup`, formData, {
    withCredentials: true,
  });
}

export function loginUser(formData: User) {
  return axios.post(`${API_URL}/auth/login`, formData, {
    withCredentials: true,
  });
}

export function logoutUser() {
  return axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
}
