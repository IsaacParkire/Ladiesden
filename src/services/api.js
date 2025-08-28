import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://denbackend.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

console.log('API Base URL:', api.defaults.baseURL);

// Token management
const TOKEN_KEY = 'auth_token';

export const tokenManager = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
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
        // No refresh token in JS, just call refresh endpoint (cookie is sent automatically)
        const response = await axios.post(
          `${api.defaults.baseURL}/accounts/token/refresh/`,
          {},
          { withCredentials: true }
        );
        const { access } = response.data;
        tokenManager.setToken(access);
        return api(originalRequest);
      } catch (refreshError) {
        tokenManager.clearTokens();
        window.location.href = '/Laydiesden/login';
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  // Health check endpoint
  healthCheck: async () => {
    try {
      const response = await api.get('/health/');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  login: async (credentials) => {
    const response = await api.post('/accounts/login/', credentials, { withCredentials: true });
    const { access, user } = response.data;
    tokenManager.setToken(access);
    localStorage.setItem('user_data', JSON.stringify(user));
    return { user, tokens: { access } };
  },
  register: async (userData) => {
    console.log('API: Sending registration request to:', `${api.defaults.baseURL}/accounts/register/`);
    console.log('API: Registration data:', userData);
    try {
      const response = await api.post('/accounts/register/', userData, { withCredentials: true });
      console.log('API: Registration response:', response.data);
      const { access, user } = response.data;
      tokenManager.setToken(access);
      localStorage.setItem('user_data', JSON.stringify(user));
      return { user, tokens: { access } };
    } catch (error) {
      console.error('API: Registration error:', error);
      console.error('API: Error response:', error.response?.data);
      throw error;
    }
  },
  logout: async () => {
    try {
      await api.post('/accounts/logout/', {}); // No refresh token needed
    } finally {
      tokenManager.clearTokens();
      localStorage.removeItem('user_data');
    }
  },
  getProfile: () => api.get('/accounts/profile/'),
  updateProfile: (data) => api.patch('/accounts/profile/', data),
  updateUserProfile: (data) => api.patch('/accounts/profile/update/', data),
  changePassword: (data) => api.patch('/accounts/change-password/', data),
};

export const productsAPI = {
  getAll: (params = {}) => api.get('/products/', { params }),
  getById: (id) => api.get(`/products/${id}/`),
  getCategories: () => api.get('/products/categories/'),
  getMainCategories: () => api.get('/products/main-categories/'),
  getSubCategories: (params = {}) => api.get('/products/sub-categories/', { params }),
  getFeatured: () => api.get('/products/featured/'),
  search: (query) => api.get(`/products/search/?q=${query}`),
  getByPage: (page, params = {}) => api.get('/products/', {
    params: {
      ...params,
      main_category__page: page,
    },
  }),
  getByMainCategory: (mainCategoryId, params = {}) => api.get('/products/', {
    params: {
      ...params,
      main_category: mainCategoryId,
    },
  }),
  getBySubCategory: (subCategoryId, params = {}) => api.get('/products/', {
    params: {
      ...params,
      sub_category: subCategoryId,
    },
  }),
};

export const cartAPI = {
  get: () => api.get('/cart/'),
  getItems: () => api.get('/cart/items/'),
  add: (productId, quantity = 1, variantId = null) => {
    const data = { product_id: productId, quantity };
    if (variantId) data.variant_id = variantId;
    return api.post('/cart/add/', data);
  },
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

export const membershipAPI = {
  getPlans: () => api.get('/accounts/membership/plans/'),
  getCurrentStatus: () => api.get('/accounts/membership/status/'),
  getHistory: () => api.get('/accounts/membership/history/'),
  upgradeMembership: (planType, paymentData) => api.post('/accounts/membership/upgrade/', {
    plan_type: planType,
    payment_data: paymentData,
  }),
  cancelMembership: () => api.post('/accounts/membership/cancel/'),
};

export const appointmentsAPI = {
  create: (bookingData) => {
    // Remove Authorization header for guest bookings
    const token = tokenManager.getToken();
    if (token) {
      return api.post('/appointments/', bookingData);
    } else {
      // Create a new axios instance without Authorization header
      const guestApi = axios.create({
        baseURL: api.defaults.baseURL,
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' },
      });
      return guestApi.post('/appointments/', bookingData);
    }
  },
  getAll: () => api.get('/appointments/'),
  getAvailableSlots: (params = {}) => api.get('/appointments/available-slots/', { params }),
  cancel: (id, data = {}) => api.post(`/appointments/${id}/cancel/`, data),
};

export const servicesAPI = {
  getAll: (params = {}) => api.get('/services/', { params }),
  getById: (id) => api.get(`/services/${id}/`),
  getCategories: () => api.get('/services/categories/'),
  getTherapists: () => api.get('/services/therapists/'),
  getAvailability: (serviceId, date) => api.get(`/services/${serviceId}/availability/?date=${date}`),
};

export default api;
