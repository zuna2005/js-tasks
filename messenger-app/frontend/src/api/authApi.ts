import axios from "axios";
import { API_URL } from "../configs/configs";

export function checkAuth() {
  return axios.get(`${API_URL}/auth/check`, { withCredentials: true });
}

export function authRequest(signup: boolean, formData: FormData) {
  return axios.post(
    `${API_URL}/auth/${signup ? "signup" : "login"}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    },
  );
}

export function logoutUser() {
  return axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
}
