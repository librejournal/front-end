import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { createLogger } from "redux-logger";

import { userReducer, notificationReducer } from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const logger = createLogger();

const rootReducer = combineReducers({
  userState: userReducer,
  notificationState: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, undefined, applyMiddleware(logger));
let persistor = persistStore(store);
//persistor.purge();
export { store, persistor };
