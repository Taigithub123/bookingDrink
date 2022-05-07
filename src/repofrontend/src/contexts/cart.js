import React, { useReducer, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = {
  isCartOpen: false,
  items: [],
};

export const CartStateContext = createContext();
export const CartDispatchContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_CART_POPUP":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case "ADD_TO_CART":
      const id = action.payload.cartItem.props.id;
      const isOld = state.items.map((item) => item.props.id).includes(id);
      let cartItems = null;
      if (isOld) {
        const items = state.items.map((item) => {
          if (item.props.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        cartItems = [...items];
      } else {
        cartItems = [...state.items, action.payload.cartItem];
      }
      //console.log(cartItems);
      return {
        ...state,
        items: cartItems,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.props.id !== action.payload.cartItemId
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        ...initialState,
      };
    case "DECREAMENT":
      return {
        ...state,
        items: state.items.map((item, index) => {
          if (item.props.id === action.payload.cartItemId) {
            if (item.quantity === 1) return item;
            state.items.slice(index, index + 1);
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        }),
      };

    case "INCREAMENT":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.props.id === action.payload.cartItemId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const toggleCartPopup = (dispatch) => {
  return dispatch({
    type: "TOGGLE_CART_POPUP",
  });
};

export const addToCart = (dispatch, cartItem) => {
  return dispatch({
    type: "ADD_TO_CART",
    payload: {
      cartItem: cartItem,
    },
  });
};

export const removeFromCart = (dispatch, cartItemId) => {
  return dispatch({
    type: "REMOVE_FROM_CART",
    payload: {
      cartItemId: cartItemId,
    },
  });
};

export const decrementQty = (dispatch, cartItemId) => {
  return dispatch({
    type: "DECREAMENT",
    payload: {
      cartItemId: cartItemId,
    },
  });
};

export const incrementQty = (dispatch, cartItemId) => {
  return dispatch({
    type: "INCREAMENT",
    payload: {
      cartItemId: cartItemId,
    },
  });
};

export const clearCart = (dispatch) => {
  return dispatch({
    type: "CLEAR_CART",
  });
};

const CartProvider = ({ children }) => {
  const [persistedCartItems, setPersistedCartItems] = useLocalStorage(
    "cartItems",
    []
  );
  const persistedCartState = {
    isCartOpen: false,
    items: persistedCartItems || [],
  };
  const [state, dispatch] = useReducer(reducer, persistedCartState);
  useEffect(() => {
    setPersistedCartItems(state.items);
  }, [JSON.stringify(state.items)]);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export default CartProvider;
