import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import beforeSendHeaders from "./utils/beforeSendHeaders";
import store, { persistor } from "./store";
import App from "./pages";
import "./index.css";

beforeSendHeaders();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
