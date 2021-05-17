import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "addOrEdit",
  initialState: {
    isAdd: true,
  },
  reducers: {
    addOrEdit: (state, action) => {
      state.isAdd = action.payload.isAdd;
    },
  },
});
const { reducer, actions } = slice;
export const { addOrEdit } = actions;
export default reducer;
