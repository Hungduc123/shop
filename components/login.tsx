import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slice/loginSlice";

function Login() {
  const history = useHistory<object>();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<String>("");
  const [passWord, setPassWord] = useState<String>("");

  const CheckLogin = async () => {
    try {
      const name = await AsyncStorage.getItem("userName");
      const pass = await AsyncStorage.getItem("password");
      const mail = await AsyncStorage.getItem("email");
      const fName = await AsyncStorage.getItem("fullName");

      if (name !== null) {
        if (userName === name && passWord === pass) {
          const action = login({
            userName: name,
            passWord: pass,
            email: mail,
            fullName: fName,
            isAdmin: false,
          });

          console.log({ action });
          dispatch(action);

          history.push("/listItem");
        } else if (userName === "1" && passWord === "1") {
          const action = login({
            userName: "admin123",
            passWord: "P@ssword1",
            email: "admin@gmail.com",
            fullName: "admin",
            isAdmin: true,
          });

          console.log({ action });
          dispatch(action);
          history.push("/listItem");
        } else {
          alert("check again, please");
        }
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
    }
  };

  return (
    <ImageBackground source={require("../assets/bg.png")} style={styles.imgBg}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.Image}
              resizeMode="contain"
              source={require("../assets/iconLogin.png")}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "#CC6666",
                paddingBottom: 10,
              }}
            >
              Welcome
            </Text>
          </View>
          <ImageBackground
            source={require("../assets/textstart.png")}
            style={styles.img}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>User Name: </Text>
              <TextInput
                textAlign="center"
                onChangeText={(Value) => setUserName(Value)}
                style={{
                  height: 40,
                  width: 200,
                  borderColor: "gray",
                  borderWidth: 1,
                  backgroundColor: "#ADDFFF",
                  borderRadius: 30,
                }}
                placeholderTextColor="gray"
                placeholder="Enter your user name"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>Password:</Text>
              <TextInput
                textAlign="center"
                onChangeText={(Value) => setPassWord(Value)}
                style={{
                  backgroundColor: "#ADDFFF",
                  height: 40,
                  width: 200,
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                placeholderTextColor="gray"
                placeholder="Enter your password"
                secureTextEntry
              />
            </View>
          </ImageBackground>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 30,
            }}
          >
            <TouchableOpacity
              onPress={CheckLogin}
              style={{
                backgroundColor: "#48CCCD",
                borderRadius: 20,
                width: 100,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                history.push("/Register");
              }}
              style={{
                backgroundColor: "#48CCCD",
                borderRadius: 20,
                width: 100,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#E0FFFF",
  },
  Image: {
    width: 300,
    height: 300,
  },
  imgBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  img: {
    padding: 30,
    width: "100%",
    height: 200,
    resizeMode: "contain",
    justifyContent: "center",
  },
});
