import "rxjs";
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { persistStore, persistReducer } from "redux-persist";
import createChromeStorage from "redux-persist-chrome-storage";
import actions from "./actions";
import reducers from "./reducers";
import epics from "./epics";
import { logger } from "redux-logger";

const storage = createChromeStorage(window.chrome, "sync");

const config = {
  key: "root",
  whitelist: ["servers", "selectedServer"],
  storage
};

const persistedReducer = persistReducer(config, reducers);
const epicMiddleware = createEpicMiddleware();
const enhancer = applyMiddleware(epicMiddleware, logger);
const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);

epicMiddleware.run(epics);

export { actions, persistor };
export * from "./selectors";
export default store;
