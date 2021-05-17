import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Image, Text } from "react-native";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  Foundation,
} from "@expo/vector-icons";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addList, editList } from "../slice/List";
import { imageCurrentChoose } from "../slice/imageCurrentChoose";
import styles from "../styles/styles";

function addItem() {
  const history = useHistory();
  const location = useLocation<any>();
  // const isAdd = location.state.isAdd;
  const isAdd = useSelector((state: any) => state.addOrEdit.isAdd);
  console.log("isAdd");

  console.log(isAdd);
  const itemChoosed = useSelector((state: any) => state.chooseItem);

  const [nameItem, setNameItem] = useState<string>(
    isAdd ? "" : itemChoosed.name
  );
  const [descriptionItem, setDescriptionItem] = useState<string>(
    isAdd ? "" : itemChoosed.description
  );
  const [detailItem, setDetailItem] = useState<string>(
    isAdd ? "" : itemChoosed.detail
  );

  const [moneyItem, setMoneyItem] = useState<string>(
    isAdd ? "" : itemChoosed.money
  );

  const image = useSelector((state: any) => state.imageCurrentChoose);
  const list = useSelector((state: any) => state.List);
  const dispatch = useDispatch();
  console.log("img");

  console.log(image.img);

  const buttonClick = () => {
    if (isAdd) {
      //add to list
      const newItem = {
        key: list.length + 1 + "",
        name: nameItem,
        description: descriptionItem,
        img: image.img,
        detail: detailItem,
        money: moneyItem,
      };
      console.log(newItem);

      const action = addList(newItem);

      console.log({ action });
      dispatch(action);

      // const action1 = imageCurrentChoose({
      //   img: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
      // });
      // dispatch(action1);
      // history.push("/listItem");
    } else {
      //edit item

      const newItem = {
        key: itemChoosed.key,
        name: nameItem,
        description: descriptionItem,
        img: image.img,
        detail: detailItem,
        money: moneyItem,
      };
      console.log("newItem");

      console.log(newItem);

      const action = editList(newItem);

      console.log({ action });
      dispatch(action);

      // const action1 = imageCurrentChoose({
      //   img: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
      // });
      // dispatch(action1);
      // history.push("/listItem");
    }
    const action = imageCurrentChoose({
      img: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
    });
    dispatch(action);
    history.push("/listItem");
  };
  return (
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
          onPress={() => {
            const action = imageCurrentChoose({
              img: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
            });
            dispatch(action);
            history.push("/listItem");
          }}
        >
          <FontAwesome5 name="window-close" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Text> {isAdd ? "add" : "edit"} Item </Text>

      <TextInput
        textAlign="center"
        onChangeText={(Value) => setNameItem(Value)}
        style={styles.input}
        value={nameItem}
        placeholderTextColor="gray"
        placeholder="add Name"
      />
      <TextInput
        textAlign="center"
        onChangeText={(Value) => setDescriptionItem(Value)}
        style={styles.input}
        placeholderTextColor="gray"
        placeholder="add description"
        value={descriptionItem}
      />
      <TextInput
        textAlign="center"
        onChangeText={(Value) => setMoneyItem(Value)}
        style={styles.input}
        placeholderTextColor="gray"
        placeholder="add price"
        value={moneyItem}
      />
      {/* <TextInput
        textAlign="center"
        onChangeText={(Value) => setMoneyItem(Value)}
        style={styles.input}
        placeholderTextColor="gray"
        placeholder="add price"
        value={moneyItem}
      /> */}

      <TextInput
        textAlign="center"
        onChangeText={(Value) => setDetailItem(Value)}
        style={styles.input}
        value={detailItem}
        placeholderTextColor="gray"
        placeholder="add detail"
        editable
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        onPress={() => {
          history.push("/camera_");
        }}
      >
        <AntDesign name="picture" size={24} color="black" />
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: isAdd ? image.img : itemChoosed.img }}
          style={{ width: 100, height: 100 }}
        />
      )}
      <TouchableOpacity onPress={buttonClick}>
        <Foundation name="folder-add" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

export default addItem;
