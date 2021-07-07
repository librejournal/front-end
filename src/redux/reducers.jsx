import actionTypes from "./actionTypes";
import {
  applyLoginUser,
  applyUserState,
  applyLogoutUser,
  applyUserInfo,
  applyStoryNotification,
  applyCommentNotification,
} from "./actions";

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

const notificationState = {
  story: [],
  comments: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER: {
      return applyLoginUser(state, action);
    }
    case actionTypes.USER_STATE: {
      return applyUserState(state, action);
    }
    case actionTypes.USER_INFO: {
      return applyUserInfo(state, action);
    }
    case actionTypes.LOGOUT_USER: {
      return applyLogoutUser(state, action);
    }
    default:
      return state;
  }
};

export const notificationReducer = (state = notificationState, action) => {
  switch (action.type) {
    case actionTypes.STORY_NOTIFICATION: {
      return applyStoryNotification(state, action);
    }
    case actionTypes.COMMENT_NOTIFICATION: {
      return applyCommentNotification(state, action);
    }
    default:
      return state;
  }
};
