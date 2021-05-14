import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  Platform,
} from "react-native";

import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";

import * as Permissions from "expo-permissions";

import * as MediaLibrary from "expo-media-library";
import { useHistory } from "react-router-dom";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { imageCurrentChoose } from "../slice/imageCurrentChoose";

function Camera_() {
  const history = useHistory();
  const dispatch = useDispatch();

  const camRef = useRef<object | any>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [capturedPhoto, setCapturedPhoto] = useState<string | any>(null);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();

    (async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      setHasPermission(status === "granted");
    })();
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setOpen(true);
      setCapturedPhoto(data.uri);
      console.log(data);
    }
  }
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const action = imageCurrentChoose({ img: result.uri });
      dispatch(action);
      history.push("addItem");
    }
  }

  async function savePicture() {
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
      .then(() => {
        Alert.alert("Saved Picture", "Do you want change your avatar?", [
          {
            text: "Cancel",

            style: "cancel",
          },
          {
            text: "OK",
            onPress: () =>
              //   history.push({ pathname: "/Home", state: capturedPhoto }),
              {
                const action = imageCurrentChoose({ img: capturedPhoto });
                dispatch(action);
                history.push("addItem");
              },
          },
        ]);
      })
      .catch((error: any) => {
        console.log("err", error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => history.push("/listItem")}>
          <AntDesign name="leftcircle" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setFlash(
              flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
            )
          }
        >
          {flash === Camera.Constants.FlashMode.off && (
            <Ionicons name="flash-off" size={24} color="black" />
          )}
          {flash === Camera.Constants.FlashMode.on && (
            <Ionicons name="flash" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>

      <Camera style={{ flex: 1 }} type={type} ref={camRef} flashMode={flash} />

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Ionicons name="ios-camera-reverse" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePicture} style={{ padding: 20 }}>
          <FontAwesome name="camera" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={{ padding: 20 }}>
          <Fontisto name="picture" size={30} color="black" />
        </TouchableOpacity>
      </View>
      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={open}>
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
                onPress={() => setOpen(false)}
              >
                <FontAwesome5 name="window-close" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ margin: 10, paddingLeft: 100 }}
                onPress={savePicture}
              >
                <FontAwesome name="save" size={30} color="black" />
              </TouchableOpacity>
            </View>

            <Image
              style={{ resizeMode: "cover", width: "100%", height: "90%" }}
              source={{ uri: capturedPhoto }}
            />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

export default Camera_;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
