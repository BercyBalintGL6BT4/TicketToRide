import ReactDOM from "react-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import { App } from "./pages/App";
import { configureStore } from "./state/store";
import { createStoreHook, Provider } from "react-redux";

import { createStore } from "redux";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
