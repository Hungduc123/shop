import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "chooseItem",
  initialState: {
    key: "",
    name: "",
    description: "",
    img: "",
    detail: "",
    money: "",
  },

  reducers: {
    chooseItem: (state, action) => {
      state.key = action.payload.key;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.img = action.payload.img;
      state.detail = action.payload.detail;
      state.money = action.payload.money;
    },
  },
});
const { reducer, actions } = slice;
export const { chooseItem } = actions;
export default reducer;
