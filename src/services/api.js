import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios request interceptor: this demonstrates how the app automatically adds the
// JWT token to every request that goes through this instance.
api.interceptors.request.use(
  (config) => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user && user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error('Could not parse saved user for request interceptor:', error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Axios response interceptor: this handles common HTTP errors centrally.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || 'Something went wrong.';

    if (status === 401) {
      localStorage.removeItem('user');
      window.dispatchEvent(new CustomEvent('auth:logout'));

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }

      return Promise.reject({
        ...error,
        userMessage: 'Your session has expired. Please log in again.',
      });
    }

    if (status === 403) {
      return Promise.reject({
        ...error,
        userMessage: 'You are not authorized to perform this operation.',
      });
    }

    if (status === 404) {
      return Promise.reject({
        ...error,
        userMessage: 'The requested resource was not found.',
      });
    }

    if (status >= 500) {
      return Promise.reject({
        ...error,
        userMessage: 'Server error. Please try again later.',
      });
    }

    if (error.message === 'Network Error') {
      return Promise.reject({
        ...error,
        userMessage: 'Network error. Please check your backend connection.',
      });
    }

    return Promise.reject({
      ...error,
      userMessage: message,
    });
  },
);

export default api;
