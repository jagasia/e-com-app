import api from './api';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/api/v1/user/login', credentials);
    return response.data;
  },
};

export default authService;
