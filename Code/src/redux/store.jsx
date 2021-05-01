import { combineReducers, createStore } from "redux";

import userReducer from "./reducers";

const rootReducer = combineReducers({
  userState: userReducer,
});

const store = createStore(rootReducer);

export default store;
