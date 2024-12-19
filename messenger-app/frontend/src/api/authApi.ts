import axios from "axios";
import { API_URL } from "../configs/configs";
import { FormInput } from "../types/authTypes";

export function checkAuth() {
  return axios.get(`${API_URL}/auth/check`, { withCredentials: true });
}

export function signupUser(formData: FormInput) {
  return axios.post(`${API_URL}/auth/signup`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
}

export function loginUser(formData: FormInput) {
  return axios.post(`${API_URL}/auth/login`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
}

export function logoutUser() {
  return axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
}
