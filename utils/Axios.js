import axios from 'axios';

export default (config = {}) => axios.create({
  timeout: 60000,
  ...config,
  headers: {
    'Content-Type': 'application/json',
    ...(config.headers || {})
  }
});
