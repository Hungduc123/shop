import React, { useState } from "react";
import { Modal, SafeAreaView, Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
function Profile() {
  const history = useHistory();
  const user = useSelector((state: any) => state.login);
  const [options, setOptions] = useState<string>("");
  const listCart = useSelector((state: any) => state.Cart);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => history.push("/listItem")}>
        <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>Profile</Text>
      <TouchableOpacity onPress={() => setOptions("Information")}>
        <Text style={styles.text}>Information</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setOptions("My Purchases")}>
        <Text style={styles.text}>My Purchases</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => history.push("/listItem")}>
        <MaterialIcons name="home" size={40} color="black" />
      </TouchableOpacity>
      {options === "Information" && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={options === "Information"}
        >
          <SafeAreaView>
            <TouchableOpacity onPress={() => setOptions("")}>
              <Ionicons name="arrow-back-circle" size={40} color="black" />
            </TouchableOpacity>
            <Text>information</Text>
            <Text>{user.fullName}</Text>
            <Text>{user.email}</Text>
          </SafeAreaView>
        </Modal>
      )}

      {options === "My Purchases" && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={options === "My Purchases"}
        >
          <SafeAreaView>
            <TouchableOpacity onPress={() => setOptions("")}>
              <Ionicons name="arrow-back-circle" size={40} color="black" />
            </TouchableOpacity>
            <Text>My Purchases</Text>
            <Text>{listCart.toString()}</Text>
          </SafeAreaView>
        </Modal>
      )}
    </SafeAreaView>
  );
}

export default Profile;
