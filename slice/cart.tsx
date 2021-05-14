import { createSlice } from "@reduxjs/toolkit";
import dataItem from "../data/dataItem";

// var dataCartList: dataItem[] = [];

const cart = createSlice({
  name: "cart",
  initialState: [
    {
      key: "2",
      name: "B",
      description: "BBB",
      img: "https://cdn.nguyenkimmall.com/images/companies/1/000000000010012474-bo-ly.jpg",
      detail: "this is B",

      count: 1,
      money: 1000,
    },
    {
      key: "3",
      name: "B",
      description: "BBB",
      img: "https://cdn.nguyenkimmall.com/images/companies/1/000000000010012474-bo-ly.jpg",
      detail: "this is B",

      count: 1,
      money: 1000,
    },
  ],

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
  },
});
const { reducer, actions } = cart;
export const { addCartList, removeCartList, editItem } = actions;
export default reducer;
