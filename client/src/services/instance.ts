import axios from 'axios';

const instance = axios.create({
  headers: {
    accept: 'application/json',
  },
});

export default instance;
