import actionTypes from "./actionTypes";

const userState = {
  user: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  token: "",
};

const applyRegisterUser = (state, action) => {
  const todo = Object.assign({}, action.todo, { completed: false });

  return state.concat(todo);
};

const applyLoginUser = (state, action) => {};

const applyUserState = (state, action) => {};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER: {
      return applyRegisterUser(state, action);
    }
    case actionTypes.LOGIN_USER: {
      return applyLoginUser(state, action);
    }
    case actionTypes.USER_STATE: {
      return applyUserState(state, action);
    }
    default:
      return state;
  }
};

export default userReducer;
