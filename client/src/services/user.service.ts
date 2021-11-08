import { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = process.env.VUE_APP_API_ENDPOINT;

const user = (axios: AxiosInstance) => ({
  validateUsername(username: string) {
    return axios
      .get(`${BASE_URL}/user/validate/username`, { params: { username } })
      .then((response: AxiosResponse) => response.data);
  },
  validateEmail(email: string) {
    return axios
      .get(`${BASE_URL}/user/validate/email`, { params: { email } })
      .then((response: AxiosResponse) => response.data);
  },
});

export default user;
