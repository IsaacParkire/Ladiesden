import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI, tokenManager, membershipAPI } from '../services/api';
import { useCart } from "./CartContext";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });
  const { syncCartWithBackend } = useCart ? useCart() : { syncCartWithBackend: null };

  // Helper to merge membership status into user
  const mergeMembershipStatus = async (user) => {
    try {
      const res = await membershipAPI.getCurrentStatus();
      const { user: userData, current_plan, privileges } = res.data;
      return {
        ...user,
        membership_type: userData?.membership_type || user?.membership_type || 'basic',
        membership_privileges: privileges || {},
        current_plan: current_plan || null,
      };
    } catch (e) {
      return user;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      if (tokenManager.isAuthenticated()) {
        try {
          const response = await authAPI.getProfile();
          let user = response.data;
          user = await mergeMembershipStatus(user);
          dispatch({ type: 'SET_USER', payload: user });
        } catch (error) {
          tokenManager.clearTokens();
          dispatch({ type: 'LOGOUT' });
        }
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const { user } = await authAPI.login(credentials);
      const userWithMembership = await mergeMembershipStatus(user);
      dispatch({ type: 'SET_USER', payload: userWithMembership });
      
      // --- Cart Sync Logic ---
      // Sync guest cart to backend after login
      const guestCart = localStorage.getItem('laydiesden_cart');
      if (syncCartWithBackend && guestCart) {
        try {
          const parsedCart = JSON.parse(guestCart);
          if (parsedCart.length > 0) {
            await syncCartWithBackend(parsedCart);
            localStorage.removeItem('laydiesden_cart');
          }
        } catch (e) {
          // ignore
        }
      }
      // --- End Cart Sync ---
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, error: message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      console.log('Attempting registration with:', userData);
      const { user } = await authAPI.register(userData);
      console.log('Registration successful:', user);
      dispatch({ type: 'SET_USER', payload: user });
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      
      let message = 'Registration failed';
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          message = error.response.data;
        } else if (error.response.data.detail) {
          message = error.response.data.detail;
        } else if (error.response.data.message) {
          message = error.response.data.message;
        } else if (error.response.data.non_field_errors) {
          message = error.response.data.non_field_errors[0];
        } else {
          // Handle field-specific errors
          const errors = Object.values(error.response.data).flat();
          message = errors.join(', ');
        }
      }
      
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, error: message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await authAPI.updateProfile(data);
      dispatch({ type: 'SET_USER', payload: response.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.detail || 
                     error.response?.data?.message || 
                     'Update failed';
      return { success: false, error: message };
    }
  };

  const updateUserProfile = async (data) => {
    try {
      const response = await authAPI.updateUserProfile(data);
      // Merge the updated profile data with existing user data
      const updatedUser = { ...state.user, profile: response.data };
      dispatch({ type: 'SET_USER', payload: updatedUser });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.detail || 
                     error.response?.data?.message || 
                     'Profile update failed';
      return { success: false, error: message };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      await authAPI.changePassword(passwordData);
      return { success: true, message: 'Password changed successfully' };
    } catch (error) {
      const message = error.response?.data?.detail || 
                     error.response?.data?.message || 
                     'Password change failed';
      return { success: false, error: message };
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    updateUserProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
