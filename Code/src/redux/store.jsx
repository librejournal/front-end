import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { createLogger } from "redux-logger";

import userReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const logger = createLogger();

const rootReducer = combineReducers({
  userState: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, undefined, applyMiddleware(logger));
let persistor = persistStore(store);

export { store, persistor };
