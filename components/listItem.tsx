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
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeList, addList } from "../slice/List";
import { chooseItem } from "../slice/chooseItem";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { addCartList, editItem } from "../slice/cart";
import { imageCurrentChoose } from "../slice/imageCurrentChoose";

function listItem() {
  const history = useHistory();
  const location = useLocation<any>();
  const isAdmin = useSelector((state: any) => state.login.isAdmin);
  const [openItem, setOpenItem] = useState<boolean>(false);

  const dispatch = useDispatch();

  const itemChoosed = useSelector((state: any) => state.chooseItem);
  const list = useSelector((state: any) => state.List);
  const cart = useSelector((state: any) => state.cart);
  const onPressItem = (item: any) => {
    setOpenItem(true);
    const action = chooseItem({
      key: item.key,
      name: item.name,
      description: item.description,
      img: item.img,
      detail: item.detail,
      money: item.money,
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
    const itemIndex = cart.findIndex(cart.key === item.key);
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
              key: item.key,
              name: item.name,
              description: item.description,
              img: item.img,
              detail: item.detail,
              // ...item,
              count: parseInt(item.count) + 1,
            };

            const action = editItem(newItem);
            dispatch(action);
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
    const actionPushImage = imageCurrentChoose(item.img);
    dispatch(actionPushImage);
    const action = chooseItem({
      key: item.key,
      name: item.name,
      description: item.description,
      img: item.img,
      detail: item.detail,
      money: item.money,
    });
    dispatch(action);
    console.log(item);
    history.push({ pathname: "/addItem", state: { isAdd: false } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => {
          history.push("/login");
        }}
      >
        <FontAwesome5 name="window-close" size={30} color="black" />
      </TouchableOpacity>
      {isAdmin && (
        <>
          <Text>
            your are {useSelector((state: any) => state.login.fullName)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              history.push({ pathname: "/addItem", state: { isAdd: true } });
            }}
          >
            <Entypo name="add-to-list" size={24} color="black" />
          </TouchableOpacity>
        </>
      )}
      {!isAdmin && (
        <>
          <Text>
            your are {useSelector((state: any) => state.login.fullName)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              history.push("/cart");
            }}
          >
            <AntDesign name="shoppingcart" size={24} color="black" />
          </TouchableOpacity>
        </>
      )}
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
                      removeItem(item);
                      console.log({ item });
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

            <Text>{itemChoosed.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="money-check-alt" size={24} color="black" />
              <AntDesign name="shoppingcart" size={24} color="black" />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

export default listItem;
