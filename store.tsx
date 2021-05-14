import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import chooseItemReducer from "./slice/chooseItem";
import addListReducer from "./slice/List";

import imageCurrentChooseReducer from "./slice/imageCurrentChoose";
import CartSelectedReducer from "./slice/cartSelected";
import addCartReducer from "./slice/cart";
const rootReducer = {
  login: loginReducer,
  chooseItem: chooseItemReducer,
  List: addListReducer,
  imageCurrentChoose: imageCurrentChooseReducer,
  Cart: addCartReducer,
  CartSelected: CartSelectedReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
