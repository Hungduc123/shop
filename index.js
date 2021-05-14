import { registerRootComponent } from "expo";
import React from "react";

import App from "./App";
import { name as appName } from "./app.json";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
   
)
registerRootComponent(App);