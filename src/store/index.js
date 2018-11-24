import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createChromeStorage from "redux-persist-chrome-storage";
import actions from "./actions";
import reducers from "./reducers";

const { REACT_APP_DEBUG } = process.env;
const storage = createChromeStorage(window.chrome, "sync");

const persistConfig = {
  key: "root",
  whitelist: ["servers", "selectedServer", "addServerForm"],
  storage
};
const middlewares = [];

if (REACT_APP_DEBUG === "true") {
  const { logger } = require("redux-logger");

  middlewares.push(logger);
}

const persistedReducer = persistReducer(persistConfig, reducers);
const enhancer = applyMiddleware(...middlewares);
const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);

export { actions, persistor };
export * from "./selectors";
export default store;
