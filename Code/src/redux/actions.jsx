import { initialState } from "./reducers";

const applyLoginUser = (state, action) => {
  const newState = { ...state, token: action.payload };
  return newState;
};

const applyUserState = (state, action) => {
  const newState = { token: state.token, ...action.payload };
  return newState;
};

const applyLogoutUser = () => {
  const newState = { ...initialState };
  return newState;
};

export { applyLoginUser, applyUserState, applyLogoutUser };
