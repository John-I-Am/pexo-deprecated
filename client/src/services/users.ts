import axios from "axios";
import { NewUser, UserCredentials } from "../types";

const register = async (newUser: NewUser): Promise<void> => {
  const response = await axios.post("/api/users", newUser);
  return response.data;
};

const login = async (credentials: UserCredentials): Promise<any> => {
  const response = await axios.post("/api/login", credentials);
  return response.data;
};

const fetch = async (token: string, userId: string): Promise<void> => {
  const config: any = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.get(`/api/users/${userId}`, config);
  return response.data;
};

const update = async (token: string, userId: string, updatedUser: any): Promise<any> => {
  const config: any = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.put(`/api/users/${userId}`, updatedUser, config);
  return response.data;
};

export default {
  register, login, fetch, update,
};
