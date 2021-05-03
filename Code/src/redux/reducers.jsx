import actionTypes from "./actionTypes";
import { applyLoginUser, applyUserState, applyLogoutUser } from "./actions";

export const initialState = {
  token: "",
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  is_active: "",
  is_staff: "",
  uuid: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER: {
      return applyLoginUser(state, action);
    }
    case actionTypes.USER_STATE: {
      return applyUserState(state, action);
    }
    case actionTypes.LOGOUT_USER: {
      return applyLogoutUser(state, action);
    }
    default:
      return state;
  }
};

export default userReducer;
