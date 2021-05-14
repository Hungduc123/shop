import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, ComponentElement, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useHistory } from "react-router-dom";
import User from "../data/user";

function Register() {
  let history = useHistory<object>();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassWord] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const [errors, setErrors] = useState<User>({});

  const RegisterComplete = () =>
    Alert.alert("Register complete", "Do you want log in now?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => history.push("/") },
    ]);
  const storeData = async () => {
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      fullName: "",
    });
    try {
      let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let regPassword = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
      if (
        userName !== "" &&
        password !== "" &&
        email !== "" &&
        confirmPassword !== ""
      ) {
        if (!regEmail.test(email)) {
          setErrors({ email: "email not correct" });
        } else if (!regPassword.test(password)) {
          setErrors({ password: "password not correct" });
        } else if (password !== confirmPassword) {
          setErrors({
            confirmPassword: "confirm password isn't the same with password",
          });
        } else {
          await AsyncStorage.setItem("userName", userName);
          await AsyncStorage.setItem("fullName", fullName);

          await AsyncStorage.setItem("password", password);
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("confirmPassword", confirmPassword);
          await AsyncStorage.setItem("avatar", "");

          RegisterComplete();
        }
      } else {
        //  alert("check again, please");
        if (userName === "") {
          setErrors({ userName: "username empty" });
        } else if (fullName === "") {
          setErrors({ fullName: "fullname empty" });
        } else if (email === "") {
          setErrors({ email: "email empty" });
        } else if (password === "") {
          setErrors({ password: "password empty" });
        } else if (confirmPassword === "") {
          setErrors({ confirmPassword: "confirmPassword empty" });
        }
      }
      //    setErrors(Object.assign({}, errors));
    } catch (error) {
      // Error saving data
      error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View
          style={{
            padding: 20,
            alignItems: "center",
            backgroundColor: "pink",
            width: 350,
            height: 350,
            borderRadius: 30,
            justifyContent: "space-evenly",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#CC6666",
              paddingBottom: 10,
            }}
          >
            Register
          </Text>
          <View style={styles.containInput}>
            <Text>User Name: </Text>
            <TextInput
              textAlign="center"
              returnKeyType="next"
              onChangeText={(Value) => setUserName(Value)}
              style={styles.contentInput}
              placeholderTextColor="gray"
              placeholder="Enter your user name"
            />
          </View>
          <Text style={errors.userName ? styles.e : styles.hide}>
            {errors.userName}
          </Text>

          <View style={styles.containInput}>
            <Text>Full Name: </Text>
            <TextInput
              textAlign="center"
              returnKeyType="next"
              onChangeText={(Value) => setFullName(Value)}
              style={styles.contentInput}
              placeholderTextColor="gray"
              placeholder="Enter your full name"
            />
          </View>
          <Text style={errors.fullName ? styles.e : styles.hide}>
            {errors.fullName}
          </Text>

          <View style={styles.containInput}>
            <Text>Email: </Text>
            <TextInput
              textAlign="center"
              returnKeyType="next"
              keyboardType="email-address"
              onChangeText={(Value) => setEmail(Value)}
              style={styles.contentInput}
              placeholderTextColor="gray"
              placeholder="Enter your Email"
            />
          </View>
          <Text style={errors.email ? styles.e : styles.hide}>
            {errors.email}
          </Text>
          <View style={styles.containInput}>
            <Text>Password: </Text>
            <TextInput
              textAlign="center"
              returnKeyType="next"
              onChangeText={(Value) => setPassWord(Value)}
              style={styles.contentInput}
              placeholderTextColor="gray"
              placeholder="Enter your password"
              secureTextEntry
            />
            {/* <Text>{errors.password}</Text> */}
          </View>
          <Text style={errors.password ? styles.e : styles.hide}>
            {errors.password}
          </Text>
          <View style={styles.containInput}>
            <Text>Confirm{"\n"}Password:</Text>
            <TextInput
              textAlign="center"
              returnKeyType="next"
              onChangeText={(Value) => setConfirmPassword(Value)}
              style={styles.contentInput}
              placeholderTextColor="gray"
              placeholder="Enter your confirm password"
              secureTextEntry
            />
            {/* <Text>{errors.confirmPassword}</Text> */}
          </View>
          <Text style={errors.confirmPassword ? styles.e : styles.hide}>
            {errors.confirmPassword}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingTop: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              history.push("/");
            }}
            style={{
              backgroundColor: "#CC6666",
              borderRadius: 20,
              width: 120,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={storeData}
            style={{
              backgroundColor: "#CC6666",
              borderRadius: 20,
              width: 120,
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
  );
}

export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0FFFF",
  },
  contentInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#FFCCCC",
    borderRadius: 30,
  },
  containInput: {
    paddingStart: 20,
    paddingBottom: 10,

    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hide: {
    height: 0,
  },
  e: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    color: "red",
    height: 20,
  },
});
