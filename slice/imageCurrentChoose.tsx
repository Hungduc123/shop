import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "imageCurrentChoose",
  initialState: {
    img: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
  },

  reducers: {
    imageCurrentChoose: (state, action) => {
      state.img = action.payload.img;
    },
  },
});
const { reducer, actions } = slice;
export const { imageCurrentChoose } = actions;
export default reducer;
