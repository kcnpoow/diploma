import axios from 'axios';

const authApi = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:1111',
});

authApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    'accessToken'
  )}`;
  return config;
});

authApi.interceptors.response.use(
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
      localStorage.setItem('accessToken', response.data.accessToken);
      return await authApi.request(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default authApi;
