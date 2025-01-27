import axios from "axios";
import { API_URL } from "../configs/configs";
import { User } from "../types/userTypes";

export function getUser(username: string) {
  return axios.post(
    `${API_URL}/users/getUser`,
    { username },
    { withCredentials: true },
  );
}

export function getCurrentUser() {
  return axios.get(`${API_URL}/users/getCurrentUser`, {
    withCredentials: true,
  });
}

export function updateUserInfo(username: string, formData: User) {
  return axios.post(
    `${API_URL}/users/update`,
    { username, formData },
    { withCredentials: true },
  );
}

export function uploadProfilePic(
  username: string,
  image: File,
  oldPic: string,
) {
  const formData = new FormData();
  formData.append("profilePic", image);
  formData.append("username", username);
  formData.append("oldPic", oldPic);
  return axios.post(`${API_URL}/users/uploadProfilePic`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
}

export function deleteProfilePic(username: string, filename: string) {
  return axios.post(
    `${API_URL}/users/deleteProfilePic`,
    { username, filename },
    { withCredentials: true },
  );
}
