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
import buy from "./components/buy";
import btNav from "./components/btNav";
import Profile from "./components/Profile";

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
          <Route exact path="/buy" component={buy} />
          <Route exact path="/btNav" component={btNav} />
          <Route exact path="/Profile" component={Profile} />
        </Switch>
      </NativeRouter>
    </Provider>
  );
}
