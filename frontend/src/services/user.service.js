import axios from 'axios';

import authApi from '../api/auth.api.js';

class UserService {
  async auth() {
    return await axios.get('api/user/refresh', { withCredentials: true });
  }

  async login(email, password) {
    return await axios.post(
      'api/user/login',
      { email, password },
      { withCredentials: true }
    );
  }

  async register(name, email, password) {
    return await axios.post('api/user/register', { name, email, password });
  }

  async logout() {
    return await authApi.get('api/user/logout');
  }

  async update(data) {
    return await authApi.put('api/user/update', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default new UserService();
