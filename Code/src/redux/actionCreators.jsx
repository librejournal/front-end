import actionTypes from "./actionTypes";

const doLoginUser = (token) => {
  return {
    type: actionTypes.LOGIN_USER,
    payload: token,
  };
};
const doCheckUserState = (info) => {
  return {
    type: actionTypes.USER_STATE,
    payload: { ...info },
  };
};
const doLogoutUser = () => {
  return {
    type: actionTypes.LOGOUT_USER,
  };
};
export { doLoginUser, doCheckUserState, doLogoutUser };
