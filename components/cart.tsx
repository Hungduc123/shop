import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { AntDesign } from "@expo/vector-icons";
import { checkBox, editItem, removeCartList } from "../slice/cart";
import {
  addCartListSelected,
  removeListSelected,
  updateItem,
} from "../slice/cartSelected";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useHistory } from "react-router-dom";
import dataItem from "../data/dataItem";

function cart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const listCart = useSelector((state: any) => state.Cart);
  const listBuy = useSelector((state: any) => state.CartSelected);
  console.log("listCart");

  console.log(listCart);
  console.log("listBuy");

  console.log(listBuy);

  const listSelected = useSelector((state: any) => state.CartSelected);
  const removeItem = (item: any) => {
    const removeItemId = item.key;
    const action = removeCartList(removeItemId);
    const action1 = removeListSelected(removeItemId);

    dispatch(action);
    dispatch(action1);
  };
  const choose = (item: any) => {
    if (!item.isCheck) {
      const action = addCartListSelected(item);
      dispatch(action);
      console.log("add");
      console.log(item);
    } else {
      const action = removeListSelected(item.key);
      dispatch(action);
      console.log("remove");
      console.log(item);
    }
    const newItem = {
      ...item,
      isCheck: !item.isCheck,
    };

    const action = checkBox(newItem);
    dispatch(action);
    console.log(newItem);
  };
  const Total = (listSelected: Array<dataItem>): number => {
    return listSelected.reduce(
      (accumulator: number, currentValue: dataItem): number =>
        accumulator + parseInt(currentValue.money) * currentValue.count,
      0
    );
  };
  const total: number = Total(listSelected);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Shopping Cart</Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => history.push("/listItem")}
        >
          <Ionicons name="arrow-back-circle" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => history.push("/buy")}>
          <FontAwesome5 name="money-check-alt" size={40} color="black" />
        </TouchableOpacity>
      </View>
      {listCart.length === 0 && (
        <Text style={styles.text}>Your cart are empty</Text>
      )}
      <FlatList
        data={listCart}
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity style={{}} onPress={() => choose(item)}>
                  {!item.isCheck && (
                    <MaterialCommunityIcons
                      name="checkbox-blank-outline"
                      size={24}
                      color="black"
                    />
                  )}
                  {item.isCheck && (
                    <Ionicons name="checkbox-outline" size={24} color="black" />
                  )}
                </TouchableOpacity>

                <Image
                  source={{ uri: item.img }}
                  style={{ width: 100, height: 100, backgroundColor: "black" }}
                />
                <View style={{ flex: 1 }}>
                  <Text>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text>{parseInt(item.money) * item.count}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    const newItem = {
                      ...item,
                      count: item.count + 1,
                    };

                    const action = editItem(newItem);
                    dispatch(action);
                    const action1 = updateItem(newItem);
                    dispatch(action1);
                  }}
                >
                  <AntDesign name="plussquareo" size={24} color="black" />
                </TouchableOpacity>
                <Text>{item.count}</Text>
                <TouchableOpacity
                  onPress={() => {
                    let temp = parseInt(item.count) - 1;
                    if (temp <= 0) {
                      Alert.alert(
                        "The number of item is one",
                        "Do you want delete item from list cart??",
                        [
                          {
                            text: "Cancel",

                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => {
                              const removeItemId = item.key;
                              const action = removeCartList(removeItemId);
                              dispatch(action);
                              const action1 = removeListSelected(removeItemId);
                              dispatch(action1);
                            },
                          },
                        ]
                      );
                    } else {
                      const newItem = {
                        // key: item.key,
                        // name: item.name,
                        // description: item.description,
                        // img: item.img,
                        // detail: item.detail,
                        ...item,
                        count: temp,
                      };

                      const action = editItem(newItem);
                      dispatch(action);
                      const action1 = updateItem(newItem);
                      dispatch(action1);
                    }
                  }}
                >
                  <AntDesign name="minussquareo" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  removeItem(item);
                }}
              >
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      ></FlatList>
      <Text>{total}</Text>
    </SafeAreaView>
  );
}

export default cart;
