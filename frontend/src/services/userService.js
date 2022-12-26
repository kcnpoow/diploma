import axios from 'axios';

import authApi from '../api/authApi.js';

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

  async update(name, email) {
    return await authApi.put('api/user/update', { name, email });
  }
}

const userService = new UserService();

export default userService;
