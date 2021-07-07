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

const doGetUserInfo = (info) => {
  return {
    type: actionTypes.USER_INFO,
    payload: { ...info },
  };
};

const doLogoutUser = () => {
  return {
    type: actionTypes.LOGOUT_USER,
  };
};

const doGetStoryNotifications = (info) => {
  return {
    type: actionTypes.STORY_NOTIFICATION,
    payload: info,
  };
};

const doGetCommentNotifications = (info) => {
  return {
    type: actionTypes.COMMENT_NOTIFICATION,
    payload: info,
  };
};

export {
  doLoginUser,
  doCheckUserState,
  doLogoutUser,
  doGetUserInfo,
  doGetStoryNotifications,
  doGetCommentNotifications,
};
