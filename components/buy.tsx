import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useHistory } from "react-router-dom";
import dataItem from "../data/dataItem";
import { removeAll } from "../slice/cartSelected";
import { removeAfterBuy } from "../slice/cart";
import { addMyPurchases } from "../slice/myPurchases";

function buy() {
  const history = useHistory();
  const dispatch = useDispatch();
  const listBuy = useSelector((state: any) => state.CartSelected);
  const listCart = useSelector((state: any) => state.Cart);

  const user = useSelector((state: any) => state.login);
  const Total = (listBuy: Array<dataItem>): number => {
    return listBuy.reduce(
      (accumulator: number, currentValue: dataItem): number =>
        accumulator + parseInt(currentValue.money) * currentValue.count,
      0
    );
  };
  const total: number = Total(listBuy);
  let name: string;
  function myFunction(item: any) {
    name += item.fullName + ", ";
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>Buy</Text>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          history.push("/cart");
        }}
      >
        <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
      <View style={{ position: "absolute", left: 50, top: 100 }}>
        <Text>{user.fullName}</Text>
        <Text>{user.email}</Text>
      </View>
      <FlatList
        data={listBuy}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) => (
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <Image
                source={{ uri: item.img }}
                style={{ width: 100, height: 100 }}
              />
              <Text>
                {item.name}x{item.count}
              </Text>
            </View>
          </ScrollView>
        )}
      ></FlatList>
      <View style={{ flexDirection: "row" }}>
        <Text>{total}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          alert("buy complete");

          const action1 = removeAfterBuy(listBuy);
          dispatch(action1);
          const action = removeAll("111");
          dispatch(action);
          //           var sum = 0;
          // var numbers = [65, 44, 12, 4];
          listBuy.forEach(myFunction);

          // const action2=addMyPurchases({
          //   time: "12h30m",
          //   Total: total,
          //   Name: [],

          // })
          // dispatch(action2);
        }}
      >
        <FontAwesome5 name="money-check-alt" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default buy;
