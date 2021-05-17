import { createSlice } from "@reduxjs/toolkit";
import dataMyPurchases from "../data/dataMyPurchases";

var data: dataMyPurchases[] = [];

const myPurchases = createSlice({
  name: "myPurchases",
  initialState: data,

  reducers: {
    addMyPurchases: (state, action) => {
      state.push(action.payload);
    },
  },
});
const { reducer, actions } = myPurchases;
export const { addMyPurchases } = actions;
export default reducer;
