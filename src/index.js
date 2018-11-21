import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import removeUserAgentFromRequests from "./utils/removeUserAgentFromRequests";
import store, { persistor } from "./store";
import App from "./pages";
import "./index.css";

removeUserAgentFromRequests();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
