import { createSlice } from "@reduxjs/toolkit";
import listItem from "../components/listItem";
// import dataItemlist from "../data/dataItemlist";
var dataItemlist = [
  {
    key: "1",
    name: "A",
    description: "AAA",
    img: "https://tracu.com.vn/wp-content/uploads/2018/05/am-thuy-binh.png",
    detail: "this is A",
    count: 1,
    money: 1000,
  },
  {
    key: "2",
    name: "B",
    description: "BBB",
    img: "https://cdn.nguyenkimmall.com/images/companies/1/000000000010012474-bo-ly.jpg",
    detail: "this is B",
    count: 1,
    money: 2000,
  },
  {
    key: "3",
    name: "C",
    description: "CCC",
    img: "https://mucinthanhdat.com/image/cache/catalog/sanpham/ly-su/ly-vien-mau-500x500.jpg",
    detail: "this is C",
    count: 1,
    money: 3000,
  },
];

const List = createSlice({
  name: "List",
  initialState: dataItemlist,

  reducers: {
    addList: (state, action) => {
      state.push(action.payload);
    },
    removeList: (state, action) => {
      const removeListId = action.payload;
      state = state.filter((List) => List.key !== removeListId);
      return state;
    },
    editList: (state, action) => {
      const newItem = action.payload;
      const itemIndex = state.findIndex(
        (List) => List.key === action.payload.key
      );
      if (itemIndex >= 0) {
        state[itemIndex] = newItem;
      }
    },
  },
});
const { reducer, actions } = List;
export const { addList, removeList, editList } = actions;
export default reducer;
