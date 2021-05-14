import React from "react";
import login from "./components/login";
import register from "./components/register";
import { NativeRouter, Route, Switch } from "react-router-native";
import listItem from "./components/listItem";
import store from "./store";
import { Provider } from "react-redux";

import camera_ from "./components/camera_";
import addItem from "./components/addItem";
import cart from "./components/cart";

export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/listItem" component={listItem} />

          <Route exact path="/register" component={register} />
          <Route exact path="/camera_" component={camera_} />
          <Route exact path="/addItem" component={addItem} />
          <Route exact path="/cart" component={cart} />
        </Switch>
      </NativeRouter>
    </Provider>
  );
}
