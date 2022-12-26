import axios from 'axios';

const api = axios.create({
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      const response = await axios.get('api/user/refresh', {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
      return api.request(originalRequest);
    }
  }
);

export default api;
