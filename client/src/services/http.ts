import Axios from 'axios';

const baseURL = process.env.VUE_APP_API_URL
  ? process.env.VUE_APP_API_URL
  : '/';

const axiosInstance = Axios.create({ baseURL, withCredentials: true });
export const request = () => axiosInstance;
