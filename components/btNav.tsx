import React, { useState } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
} from "native-base";
import { SafeAreaView, TouchableOpacity } from "react-native";
import listItem from "./listItem";
import cart from "./cart";
import styles from "../styles/styles";

function btNav() {
  //     const pressCart=()=>{
  //         return(
  //             <cart></cart>
  //         )

  //     }
  const [key, setKey] = useState<string>("");
  return (
    <Container
      style={{
        padding: 10,
      }}
    >
      <Header />

      <Content>
        {key === "cart" && <Text>cart</Text>}
        {key === "profile" && <Text>profile</Text>}
      </Content>

      <Footer>
        <FooterTab>
          <TouchableOpacity>
            <Badge>
              <Text>2</Text>
            </Badge>
            <Icon name="apps" />
            <Text>List Item</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setKey("cart");
            }}
          >
            <Icon name="camera" />
            <Text>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Badge>
              <Text>51</Text>
            </Badge>
            <Icon active name="navigate" />
            <Text>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setKey("profile");
            }}
          >
            <Icon name="person" />
            <Text>Profile</Text>
          </TouchableOpacity>
        </FooterTab>
      </Footer>
    </Container>
  );
}

export default btNav;
