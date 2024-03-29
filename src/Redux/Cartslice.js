"use client"


import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
  name: 'Cart',
  initialState: [],
  reducers: {
    add(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.findIndex(item => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.push(newItem);
      }
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const { id } = action.payload;
      const itemToUpdate = state.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity++;
      }
    },
    decreaseQuantity(state, action) {
      const { id } = action.payload;
      const itemToUpdate = state.find(item => item.id === id);
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity--;
      }
    },
  },
});

export const { add, remove, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
