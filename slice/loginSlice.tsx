import { createSlice } from "@reduxjs/toolkit";
import User from "../data/user";

const user: User = {};
const slice = createSlice({
  name: "login",
  // initialState: {
  //   userName: "",
  //   password: "",
  //   email: "",
  //   fullName: "",
  //   isAdmin: false,

  // },
  initialState: user,

  reducers: {
    login: (state, action) => {
      state.fullName = action.payload.fullName;
      state.password = action.payload.password;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});
const { reducer, actions } = slice;
export const { login } = actions;
export default reducer;
