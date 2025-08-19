import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI, tokenManager } from '../services/api';

// Cart Context
const CartContext = createContext();

// Cart Actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SYNC_WITH_BACKEND: 'SYNC_WITH_BACKEND',
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
      
    case CART_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
      
    case CART_ACTIONS.SYNC_WITH_BACKEND:
      return {
        ...state,
        items: action.payload,
        synced: true,
        error: null,
      };
      
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id || 
        (item.product_id === action.payload.product_id && item.variant_id === action.payload.variant_id)
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            (item.id === action.payload.id || 
             (item.product_id === action.payload.product_id && item.variant_id === action.payload.variant_id))
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      };
    }
      case CART_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => 
          item.id !== action.payload && 
          item.cart_item_id !== action.payload
        )
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity, cart_item_id } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => 
            item.id !== id && 
            item.cart_item_id !== cart_item_id
          )
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          (item.id === id || item.cart_item_id === cart_item_id) 
            ? { ...item, quantity } 
            : item
        )
      };
    }
      case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: []
      };
    }
    
    case CART_ACTIONS.LOAD_CART: {
      return {
        ...state,
        items: action.payload
      };
    }
    
    default:
      return state;
  }
};

// Initial State
const initialState = {
  items: [],
  loading: false,
  error: null,
  synced: false,
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage and sync with backend
  useEffect(() => {
    const initializeCart = async () => {
      // First load from localStorage for immediate UI
      const savedCart = localStorage.getItem('laydiesden_cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }

      // If user is authenticated, sync with backend
      if (tokenManager.isAuthenticated()) {
        try {
          dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
          const response = await cartAPI.get();
          const backendItems = response.data.items || [];
          dispatch({ type: CART_ACTIONS.SYNC_WITH_BACKEND, payload: backendItems });
        } catch (error) {
          console.error('Error syncing cart with backend:', error);
          dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to sync cart' });
        } finally {
          dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
        }
      }
    };

    initializeCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (state.synced || !tokenManager.isAuthenticated()) {
      localStorage.setItem('laydiesden_cart', JSON.stringify(state.items));
    }
  }, [state.items, state.synced]);
  // Cart Actions
  const addItem = async (product, quantity = 1, variantId = null) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: null });

      if (tokenManager.isAuthenticated()) {
        // Add to backend cart
        const response = await cartAPI.add(product.id, quantity, variantId);
        const addedItem = response.data;
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: addedItem });
      } else {
        // Add to local cart
        const cartItem = {
          ...product,
          product_id: product.id,
          variant_id: variantId,
          quantity,
          cart_item_id: `local_${Date.now()}_${product.id}`,
          image: product.primary_image || (product.images && product.images[0]?.image) || '',
        };
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: cartItem });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to add item to cart' });
      throw error;
    }
  };

  const removeItem = async (itemId) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: null });

      if (tokenManager.isAuthenticated()) {
        // Remove from backend cart
        await cartAPI.remove(itemId);
      }
      
      // Remove from local state
      dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to remove item from cart' });
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: null });

      if (tokenManager.isAuthenticated()) {
        // Update in backend cart
        if (quantity <= 0) {
          await cartAPI.remove(itemId);
        } else {
          await cartAPI.update(itemId, quantity);
        }
      }
      
      // Update local state
      dispatch({ 
        type: CART_ACTIONS.UPDATE_QUANTITY, 
        payload: { id: itemId, cart_item_id: itemId, quantity } 
      });
    } catch (error) {
      console.error('Error updating item quantity:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to update item quantity' });
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: null });

      if (tokenManager.isAuthenticated()) {
        // Clear backend cart
        await cartAPI.clear();
      }
      
      // Clear local state
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
    } catch (error) {
      console.error('Error clearing cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to clear cart' });
      throw error;
    }
  };

  // Sync local cart with backend when user logs in
  const syncCartWithBackend = async (localItems) => {
    if (!tokenManager.isAuthenticated() || !localItems.length) return;

    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      // Add local items to backend cart
      for (const item of localItems) {
        await cartAPI.add(item.product_id, item.quantity, item.variant_id);
      }
      
      // Get updated cart from backend
      const response = await cartAPI.get();
      const backendItems = response.data.items || [];
      dispatch({ type: CART_ACTIONS.SYNC_WITH_BACKEND, payload: backendItems });
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to sync cart' });
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
    }
  };
  // Cart Calculations
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = state.items.reduce((total, item) => {
    // Handle both string and number prices
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^\d.]/g, '')) 
      : (item.price || item.product?.price || 0);
    return total + (price * item.quantity);
  }, 0);

  const value = {
    items: state.items,
    loading: state.loading,
    error: state.error,
    synced: state.synced,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    syncCartWithBackend,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
