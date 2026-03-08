import axios from "axios";
import store from "../store/reducers/store";

const api = axios.create({
    baseURL : `${import.meta.env.VITE_BACK_END_URL}/api`,
});
api.interceptors.request.use((config) => {
  const { user } = store.getState().auth;
  console.log(user);
  if (user?.jwtToken) {
    config.headers.Authorization = `Bearer ${user.jwtToken}`;
  }

  return config;
});

export default api;