import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import styles from "../styles/styles";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  Foundation,
  Ionicons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeList, addList, editList } from "../slice/List";
import { chooseItem } from "../slice/chooseItem";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { addCartList, editItem } from "../slice/cart";
// import { user } from "../slice/userSlice";

import { imageCurrentChoose } from "../slice/imageCurrentChoose";
import { addOrEdit } from "../slice/addOrEdit";
import dataItem from "../data/dataItem";
import User from "../data/user";
import { login } from "../slice/loginSlice";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
} from "native-base";
import { addCartListSelected, buyOneItem } from "../slice/cartSelected";

function listItem() {
  const history = useHistory();
  const location = useLocation<any>();
  const user = useSelector((state: any) => state.login);
  const isAdmin = user.isAdmin;
  const [openItem, setOpenItem] = useState<boolean>(false);

  const dispatch = useDispatch();

  const itemChoosed = useSelector((state: any) => state.chooseItem);
  const list = useSelector((state: any) => state.List);
  const listCart = useSelector((state: any) => state.Cart);

  console.log(listCart);
  const image = useSelector((state: any) => state.imageCurrentChoose);
  const onPressItem = (item: any) => {
    setOpenItem(true);
    const action = chooseItem({
      key: item.key,
      name: item.name,
      description: item.description,
      img: item.img,
      detail: item.detail,
      money: item.money,
      count: item.count,
    });

    console.log({ action });
    dispatch(action);
  };

  const removeItem = (item: any) => {
    const removeItemId = item.key;
    const action = removeList(removeItemId);

    dispatch(action);
  };
  const addCart = (item: any) => {
    const isLargeNumber = (element: dataItem) => element.key === item.key;
    const itemIndex = listCart.findIndex(isLargeNumber);
    if (itemIndex >= 0) {
      Alert.alert("you are already add to cart", "Do you want continue ??", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const newItem = {
              ...item,
              count: parseInt(item.count) + 1,
            };

            const action = editItem(newItem);
            dispatch(action);
            const action1 = editList(newItem);
            dispatch(action1);
            console.log("newItem------------------");

            console.log(newItem);
          },
        },
      ]);
    } else {
      alert("you added to cart");

      const action = addCartList(item);

      console.log({ action });
      dispatch(action);
    }
  };
  const edit = (item: any) => {
    const actionPushImage = imageCurrentChoose({ img: item.img });
    console.log(actionPushImage);
    dispatch(actionPushImage);

    const action = chooseItem({
      key: item.key,
      name: item.name,
      description: item.description,
      img: item.img,
      detail: item.detail,
      money: item.money,
      count: item.count,
    });
    dispatch(action);
    console.log(item);

    const action1 = addOrEdit({ isAdd: false });
    dispatch(action1);
    history.push("/addItem");
  };
  const logout = (user: User) => {
    const action = login({
      userName: "",
      passWord: "",
      email: "",
      fullName: "",
      isAdmin: false,
    });

    console.log({ action });
    dispatch(action);
    history.push("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {isAdmin ? (
          <View>
            <Text>your are {user.fullName}</Text>
            <TouchableOpacity
              onPress={() => {
                // history.push({ pathname: "/addItem", state: { isAdd: true } });
                history.push("/addItem");
                const action = addOrEdit({ isAdd: true });
                dispatch(action);
              }}
            >
              <Entypo name="add-to-list" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text>your are {user.fullName}</Text>
            <TouchableOpacity
              onPress={() => {
                history.push("/cart");
              }}
            >
              <AntDesign name="shoppingcart" size={40} color="black" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => logout(user)}>
          <AntDesign name="logout" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => history.push("/Profile")}>
          <Ionicons name="ios-person-circle-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) => (
          <ScrollView>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 50,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  onPressItem(item);
                }}
              >
                <View style={{ flex: 1 }}>
                  <Image
                    source={{ uri: item.img }}
                    style={{
                      width: 100,
                      height: 100,
                      backgroundColor: "black",
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text>{item.money}</Text>
                </View>
              </TouchableOpacity>

              {isAdmin && (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Notification",
                        "Do you want delete item from list ??",
                        [
                          {
                            text: "Cancel",

                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => {
                              removeItem(item);
                            },
                          },
                        ]
                      );
                    }}
                    style={{ flex: 1 }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => edit(item)}
                  >
                    <AntDesign name="edit" size={30} color="black" />
                  </TouchableOpacity>
                </View>
              )}
              {!isAdmin && (
                <TouchableOpacity onPress={() => addCart(item)}>
                  <AntDesign name="shoppingcart" size={24} color="black" />
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        )}
      ></FlatList>

      {openItem && (
        <Modal animationType="slide" transparent={false} visible={openItem}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => setOpenItem(false)}
              >
                <FontAwesome5 name="window-close" size={30} color="black" />
              </TouchableOpacity>
            </View>

            <Image
              style={{
                resizeMode: "cover",
                width: "100%",
                height: "50%",
              }}
              source={{ uri: itemChoosed.img }}
            />

            <Text style={styles.text}>{itemChoosed.name}</Text>
            <View style={{ flexDirection: "row", padding: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  const action = addCartListSelected(itemChoosed);
                  dispatch(action);
                  const action1 = buyOneItem(itemChoosed.key);
                  dispatch(action1);
                  history.push("/buy");
                }}
                style={{ flex: 1 }}
              >
                <FontAwesome5 name="money-check-alt" size={40} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // const action = addCartList(itemChoosed);
                  // dispatch(action);
                  addCart(itemChoosed);
                  console.log("itemChoosed");
                  console.log(itemChoosed);
                }}
              >
                <AntDesign name="shoppingcart" size={40} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

export default listItem;
