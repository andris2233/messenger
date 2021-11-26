import Axios from 'axios';

const baseURL = '';

const axiosInstance = Axios.create({ baseURL, withCredentials: true });
export const request = () => axiosInstance;
