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
  },
});
const { reducer, actions } = cartSelected;
export const { addCartListSelected, removeListSelected } = actions;
export default reducer;
