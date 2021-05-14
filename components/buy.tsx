import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { AntDesign } from "@expo/vector-icons";
import { editItem, removeCartList } from "../slice/cart";
import { addCartListSelected, removeListSelected } from "../slice/cartSelected";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useHistory } from "react-router-dom";

function buy() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Cartt</Text>
      <TouchableOpacity
        onPress={() => {
          history.push("/listItem");
        }}
      >
        <Ionicons name="arrow-back-circle" size={24} color="black" />
      </TouchableOpacity>
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
                  {isCheck && (
                    <MaterialCommunityIcons
                      name="checkbox-blank-outline"
                      size={24}
                      color="black"
                    />
                  )}
                  {!isCheck && (
                    <Ionicons name="checkbox-outline" size={24} color="black" />
                  )}
                </TouchableOpacity>

                {/* <CheckBox
                    value={isSelected}
                    onValueChange={(value) => {
                      setSelection(value);
                      if (isSelected) {
                        const action = addCartListSelected(item);
                        dispatch(action);
                      } else {
                        const action = removeListSelected(item.key);
                        dispatch(action);
                      }
                    }}
                    style={styles.checkbox}
                  /> */}

                <Image
                  source={{ uri: item.img }}
                  style={{ width: 100, height: 100, backgroundColor: "black" }}
                />
                <View style={{ flex: 1 }}>
                  <Text>{item.name}</Text>
                  <Text>{item.description}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    // let newItem = item;
                    // newItem.count = item.count + 1;
                    const newItem = {
                      key: item.key,
                      name: item.name,
                      description: item.description,
                      img: item.img,
                      detail: item.detail,
                      isChecked: item.isChecked,
                      count: parseInt(item.count) + 1,
                    };

                    const action = editItem(newItem);
                    dispatch(action);
                    console.log(count);
                  }}
                >
                  <AntDesign name="plussquareo" size={24} color="black" />
                </TouchableOpacity>
                <Text>{item.count} aaaaa</Text>
                <TouchableOpacity>
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
    </SafeAreaView>
  );
}

export default buy;
