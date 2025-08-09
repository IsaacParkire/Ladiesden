import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenManager = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setRefreshToken: (token) => localStorage.setItem(REFRESH_TOKEN_KEY, token),
  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = tokenManager.getRefreshToken();
        if (refreshToken) {
          const response = await axios.post(`${api.defaults.baseURL}/auth/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          tokenManager.setToken(access);
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        tokenManager.clearTokens();
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login/', credentials);
    const { access, refresh, user } = response.data;
    tokenManager.setToken(access);
    tokenManager.setRefreshToken(refresh);
    return { user, tokens: { access, refresh } };
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },
  
  logout: async () => {
    try {
      await api.post('/auth/logout/', {
        refresh_token: tokenManager.getRefreshToken(),
      });
    } finally {
      tokenManager.clearTokens();
    }
  },
  
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data) => api.patch('/auth/profile/', data),
};

export const productsAPI = {
  getAll: (params = {}) => api.get('/products/', { params }),
  getById: (id) => api.get(`/products/${id}/`),
  getCategories: () => api.get('/products/categories/'),
  getFeatured: () => api.get('/products/featured/'),
  search: (query) => api.get(`/products/search/?q=${query}`),
};

export const cartAPI = {
  get: () => api.get('/cart/'),
  add: (productId, quantity = 1) => api.post('/cart/add/', { product_id: productId, quantity }),
  update: (itemId, quantity) => api.patch(`/cart/items/${itemId}/`, { quantity }),
  remove: (itemId) => api.delete(`/cart/items/${itemId}/`),
  clear: () => api.delete('/cart/clear/'),
};

export const ordersAPI = {
  create: (orderData) => api.post('/orders/', orderData),
  get: (orderId) => api.get(`/orders/${orderId}/`),
  getAll: () => api.get('/orders/'),
  cancel: (orderId) => api.patch(`/orders/${orderId}/cancel/`),
};

export default api;
