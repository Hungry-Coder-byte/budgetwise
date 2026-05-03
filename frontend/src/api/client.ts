import axios from 'axios';

interface AxiosError {
  response?: {
    status?: number;
    data?: any;
  };
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

// Request interceptor for JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.error('Response error:', error);

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Handle unauthorized state - redirect to login or similar
      throw new Error('Unauthorized');
    }

    // Handle other errors
    throw error;
  }
);

export default apiClient;