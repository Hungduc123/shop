import { createSlice } from "@reduxjs/toolkit";
import dataItem from "../data/dataItem";

var dataCartList: dataItem[] = [];

const cartSelected = createSlice({
  name: "cartSelected",
  initialState: dataCartList,

  reducers: {
    addCartListSelected: (state, action) => {
      state.push(action.payload);
    },
    removeListSelected: (state, action) => {
      const removeListId = action.payload;
      state = state.filter((cartSelected) => cartSelected.key !== removeListId);
      return state;
    },
    updateItem: (state, action) => {
      const newItem = action.payload;
      const itemIndex = state.findIndex(
        (cartSelected) => cartSelected.key === action.payload.key
      );
      if (itemIndex >= 0) {
        state[itemIndex] = newItem;
      }
    },
    buyOneItem: (state, action) => {
      const removeListId = action.payload;
      state = state.filter((cartSelected) => cartSelected.key === removeListId);
      return state;
    },
    removeAll: (state, action) => {
      const removeListId = action.payload;
      state = [];
      return state;
    },
  },
});
const { reducer, actions } = cartSelected;
export const {
  addCartListSelected,
  removeListSelected,
  updateItem,
  buyOneItem,
  removeAll,
} = actions;
export default reducer;
