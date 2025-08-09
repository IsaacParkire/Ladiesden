import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../services/api';

const CartContext = createContext();

// Cart Actions
const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOAD_CART: 'LOAD_CART',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART'
};

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
      
    case CART_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
      
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload,
        totalItems: action.payload.reduce((total, item) => total + item.quantity, 0),
        totalPrice: action.payload.reduce((total, item) => {
          const price = item.product?.price || item.price || 0;
          return total + (price * item.quantity);
        }, 0),
        loading: false,
        error: null,
      };
      
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(item => 
        item.product?.id === action.payload.product?.id
      );
      
      let newItems;
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      
      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: newItems.reduce((total, item) => {
          const price = item.product?.price || item.price || 0;
          return total + (price * item.quantity);
        }, 0),
        loading: false,
      };
    }
      
    case CART_ACTIONS.UPDATE_ITEM: {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedItems.reduce((total, item) => {
          const price = item.product?.price || item.price || 0;
          return total + (price * item.quantity);
        }, 0),
        loading: false,
      };
    }
      
    case CART_ACTIONS.REMOVE_ITEM: {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        totalItems: filteredItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: filteredItems.reduce((total, item) => {
          const price = item.product?.price || item.price || 0;
          return total + (price * item.quantity);
        }, 0),
        loading: false,
      };
    }
      
    case CART_ACTIONS.CLEAR_CART:
      return { ...initialState };
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  // Save guest cart to localStorage
  useEffect(() => {
    localStorage.setItem('laydiesden_cart', JSON.stringify(state.items));
  }, [state.items]);

  const loadCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      // Try to load from API if user is authenticated
      try {
        const response = await cartAPI.get();
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: response.data.items || [] });
      } catch (apiError) {
        // If API fails (user not logged in), load from localStorage
        const savedCart = localStorage.getItem('laydiesden_cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
        } else {
          dispatch({ type: CART_ACTIONS.LOAD_CART, payload: [] });
        }
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to load cart' });
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      // Try API first
      try {
        const response = await cartAPI.add(productId, quantity);
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: response.data });
        return { success: true };
      } catch (apiError) {
        // Fallback to local cart for guests
        const guestItem = {
          id: `guest_${Date.now()}`,
          product: { id: productId, price: 0 }, // You'd need to fetch product details
          quantity,
        };
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: guestItem });
        return { success: true };
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to add item to cart' });
      return { success: false, error: 'Failed to add item to cart' };
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      if (quantity <= 0) {
        await removeFromCart(itemId);
        return;
      }

      try {
        const response = await cartAPI.update(itemId, quantity);
        dispatch({ type: CART_ACTIONS.UPDATE_ITEM, payload: response.data });
      } catch (apiError) {
        // Handle guest cart update
        const updatedItem = state.items.find(item => item.id === itemId);
        if (updatedItem) {
          dispatch({ 
            type: CART_ACTIONS.UPDATE_ITEM, 
            payload: { ...updatedItem, quantity } 
          });
        }
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to update cart' });
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      try {
        await cartAPI.remove(itemId);
      } catch (apiError) {
        // Handle guest cart removal
        console.log('Removing from guest cart');
      }
      
      dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to remove item' });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      try {
        await cartAPI.clear();
      } catch (apiError) {
        // Handle guest cart clear
        localStorage.removeItem('laydiesden_cart');
      }
      
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to clear cart' });
    }
  };

  // Legacy methods for backward compatibility
  const addItem = (product) => addToCart(product.id, 1);
  const removeItem = (productId) => removeFromCart(productId);

  const value = {
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    loading: state.loading,
    error: state.error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    // Legacy methods
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
