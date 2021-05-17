import { createSlice } from "@reduxjs/toolkit";
import dataItem from "../data/dataItem";

var dataCartList: dataItem[] = [];

const cart = createSlice({
  name: "cart",
  initialState: dataCartList,

  reducers: {
    addCartList: (state, action) => {
      state.push(action.payload);
    },
    removeCartList: (state, action) => {
      const removeListId = action.payload;
      state = state.filter((cart) => cart.key !== removeListId);
      return state;
    },
    editItem: (state, action) => {
      const newItem = action.payload;
      const itemIndex = state.findIndex(
        (cart) => cart.key === action.payload.key
      );
      if (itemIndex >= 0) {
        state[itemIndex] = newItem;
      }
    },
    checkBox: (state, action) => {
      const newItem = action.payload;
      const itemIndex = state.findIndex(
        (List) => List.key === action.payload.key
      );
      if (itemIndex >= 0) {
        state[itemIndex] = newItem;
      }
    },
    removeAfterBuy: (state, action) => {
      state = state.filter(
        (ar) => !action.payload.find((rm: dataItem) => rm.key === ar.key)
      );
      return state;
    },
  },
});
const { reducer, actions } = cart;
export const {
  addCartList,
  removeCartList,
  editItem,
  checkBox,
  removeAfterBuy,
} = actions;
export default reducer;
