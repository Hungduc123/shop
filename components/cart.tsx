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
import CheckBox from "@react-native-community/checkbox";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { AntDesign } from "@expo/vector-icons";
import { editItem, removeCartList } from "../slice/cart";
import { addCartListSelected, removeListSelected } from "../slice/cartSelected";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useHistory } from "react-router-dom";

function cart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const listCart = useSelector((state: any) => state.Cart);
  const [isSelected, setSelection] = useState<boolean>(false);
  const [isCheck, setChecked] = useState<boolean>(false);
  let [count, setCount] = useState<number>(0);

  const removeItem = (item: any) => {
    const removeItemId = item.key;
    const action = removeCartList(removeItemId);
    dispatch(action);
  };
  const choose = (item: any) => {
    setChecked(!isCheck);
    if (isCheck) {
      const action = addCartListSelected(item);

      dispatch(action);
    } else {
      const action = removeListSelected(item.key);
      dispatch(action);
      console.log(action);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Cart</Text>
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

                <Image
                  source={{ uri: item.img }}
                  style={{ width: 100, height: 100, backgroundColor: "black" }}
                />
                <View style={{ flex: 1 }}>
                  <Text>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text>{item.money}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    const newItem = {
                      key: item.key,
                      name: item.name,
                      description: item.description,
                      img: item.img,
                      detail: item.detail,

                      count: parseInt(item.count) + 1,
                    };

                    const action = editItem(newItem);
                    dispatch(action);
                    console.log(count);
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
                        "The number of item is 0",
                        "Do you want delete item from list cart??",
                        [
                          {
                            text: "Cancel",

                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () =>
                              //   history.push({ pathname: "/Home", state: capturedPhoto }),
                              {
                                const removeItemId = item.key;
                                const action = removeCartList(removeItemId);
                                dispatch(action);
                              },
                          },
                        ]
                      );
                    } else {
                      const newItem = {
                        key: item.key,
                        name: item.name,
                        description: item.description,
                        img: item.img,
                        detail: item.detail,

                        count: temp,
                      };

                      const action = editItem(newItem);
                      dispatch(action);
                      console.log(count);
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
    </SafeAreaView>
  );
}

export default cart;
