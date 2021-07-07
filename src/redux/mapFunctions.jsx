import {
  doCheckUserState,
  doLoginUser,
  doLogoutUser,
  doGetUserInfo,
  doGetCommentNotifications,
  doGetStoryNotifications,
} from "./actionCreators";

const getUserInfo = (state) => state.userState;
const getNotificationInfo = (state) => state.notificationState;

export const mapStateToCreateStoryPage = (state) => {
  return {
    loggedUser: getUserInfo(state),
  };
};

export const mapStateToPropsHome = (state) => {
  return {
    loggedUser: getUserInfo(state),
  };
};

export const mapStateToPropsHeader = (state) => {
  return {
    loggedUser: getUserInfo(state),
    notifications: getNotificationInfo(state),
  };
};

export const mapStateToStoriesPage = (state) => {
  return {
    loggedUser: getUserInfo(state),
  };
};

export const mapStateToPropsStoryItem = (state) => {
  return {
    loggedUser: getUserInfo(state),
  };
};

export const mapStateToPropsComments = (state) => {
  return {
    loggedUser: getUserInfo(state),
  };
};

export const mapStateToPropsLogin = (state) => {
  return {
    loggedUser: getUserInfo(state),
  };
};

export const mapDispatchToPropsLogin = (dispatch) => {
  return {
    onLoginUser: (id) => dispatch(doLoginUser(id)),
    onStateUser: (info) => dispatch(doCheckUserState(info)),
  };
};

export const mapStateToAccount = (state) => {
  return {
    loggedUser: getUserInfo(state),
  };
};

export const mapStateToApp = (state) => {
  return {
    loggedUser: getUserInfo(state),
    notifications: getNotificationInfo(state),
  };
};

export const mapStateToPropsStarboard = (state) => {
  return {
    loggedUser: getUserInfo(state),
  };
};

export const mapDispatchToApp = (dispatch) => {
  return {
    onStateUser: (info) => dispatch(doCheckUserState(info)),
    onInfoUser: (info) => dispatch(doGetUserInfo(info)),
    onStoryNotifications: (info) => dispatch(doGetStoryNotifications(info)),
    onCommentNotifications: (info) => dispatch(doGetCommentNotifications(info)),
  };
};

export const mapDispatchToAccount = (dispatch) => {
  return {
    onLogoutUser: () => dispatch(doLogoutUser()),
    onStateUser: (info) => dispatch(doCheckUserState(info)),
    onInfoUser: (info) => dispatch(doGetUserInfo(info)),
  };
};
